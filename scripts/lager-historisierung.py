#!/usr/bin/env python3
"""
Lager-Historisierung: Parst die UserSoft Lager-CSVs und baut eine SQLite-DB
mit täglichen Bestandssnapshots pro Artikel.

Usage:
  # Initial: Alle historischen CSVs verarbeiten (remote)
  ssh meinschluesselde@116.202.162.231 'python3 -' < scripts/lager-historisierung.py --init
  
  # Lokal: DB nach Download analysieren
  python3 scripts/lager-historisierung.py --analyze /path/to/lager-history.db
"""

import csv
import sqlite3
import os
import sys
import glob
import re
from datetime import datetime, date
from collections import defaultdict
from io import StringIO

CSV_DIR = "/var/www/vhosts/mein-schluessel.de/shopware-export/ZumShop"
DB_PATH = "/var/www/vhosts/mein-schluessel.de/lager-history.db"

def init_db(db_path):
    """Create SQLite database with schema."""
    conn = sqlite3.connect(db_path)
    c = conn.cursor()
    c.execute("""
        CREATE TABLE IF NOT EXISTS daily_stock (
            date TEXT NOT NULL,
            article_nr TEXT NOT NULL,
            stock INTEGER NOT NULL,
            PRIMARY KEY (date, article_nr)
        )
    """)
    c.execute("CREATE INDEX IF NOT EXISTS idx_article ON daily_stock(article_nr)")
    c.execute("CREATE INDEX IF NOT EXISTS idx_date ON daily_stock(date)")
    conn.commit()
    return conn

def parse_csv(filepath):
    """Parse a UserSoft stock CSV, return dict of article_nr -> stock."""
    stocks = {}
    with open(filepath, 'r', encoding='utf-8-sig') as f:
        reader = csv.reader(f, delimiter=';')
        header = next(reader, None)  # Skip header
        for row in reader:
            if len(row) >= 2:
                article_nr = row[0].strip('"').strip()
                try:
                    stock = int(row[1].strip('"').strip())
                except (ValueError, IndexError):
                    continue
                if article_nr:
                    stocks[article_nr] = stock
    return stocks

def get_last_csv_per_day(csv_dir):
    """Find the last CSV file for each day."""
    pattern = re.compile(r'lager(\d{8})(\d{6})\.csv$')
    day_files = defaultdict(list)
    
    for f in sorted(os.listdir(csv_dir)):
        m = pattern.match(f)
        if m:
            day = m.group(1)  # YYYYMMDD
            time = m.group(2)  # HHMMSS
            day_files[day].append((time, f))
    
    # Take last file per day
    result = {}
    for day, files in sorted(day_files.items()):
        files.sort()
        last_time, last_file = files[-1]
        date_str = f"{day[:4]}-{day[4:6]}-{day[6:8]}"
        result[date_str] = os.path.join(csv_dir, last_file)
    
    return result

def build_history(csv_dir=CSV_DIR, db_path=DB_PATH):
    """Build full history from all CSV files."""
    print(f"Scanning {csv_dir} for CSV files...")
    day_files = get_last_csv_per_day(csv_dir)
    print(f"Found {len(day_files)} days with stock data")
    
    conn = init_db(db_path)
    c = conn.cursor()
    
    # Check what we already have
    c.execute("SELECT MAX(date) FROM daily_stock")
    last_date = c.fetchone()[0]
    if last_date:
        print(f"DB has data up to {last_date}, processing only newer...")
        day_files = {d: f for d, f in day_files.items() if d > last_date}
        print(f"{len(day_files)} new days to process")
    
    batch = []
    for i, (date_str, filepath) in enumerate(sorted(day_files.items())):
        if i % 100 == 0:
            print(f"  Processing {date_str} ({i+1}/{len(day_files)})...")
        
        stocks = parse_csv(filepath)
        for article_nr, stock in stocks.items():
            batch.append((date_str, article_nr, stock))
        
        # Batch insert every 50 days
        if len(batch) > 50000:
            c.executemany("INSERT OR REPLACE INTO daily_stock VALUES (?, ?, ?)", batch)
            conn.commit()
            batch = []
    
    if batch:
        c.executemany("INSERT OR REPLACE INTO daily_stock VALUES (?, ?, ?)", batch)
        conn.commit()
    
    # Stats
    c.execute("SELECT COUNT(DISTINCT date) FROM daily_stock")
    total_days = c.fetchone()[0]
    c.execute("SELECT COUNT(DISTINCT article_nr) FROM daily_stock")
    total_articles = c.fetchone()[0]
    c.execute("SELECT MIN(date), MAX(date) FROM daily_stock")
    min_d, max_d = c.fetchone()
    
    print(f"\nDone! DB stats:")
    print(f"  Days: {total_days} ({min_d} to {max_d})")
    print(f"  Articles tracked: {total_articles}")
    print(f"  DB size: {os.path.getsize(db_path) / 1024 / 1024:.1f} MB")
    
    conn.close()

def analyze(db_path):
    """Quick analysis of the stock history."""
    conn = sqlite3.connect(db_path)
    c = conn.cursor()
    
    print("=== Lager-Historisierung Analyse ===\n")
    
    c.execute("SELECT MIN(date), MAX(date), COUNT(DISTINCT date) FROM daily_stock")
    min_d, max_d, days = c.fetchone()
    print(f"Zeitraum: {min_d} bis {max_d} ({days} Tage)\n")
    
    # Top sellers that are frequently out of stock
    print("--- Top-Seller häufig OOS (Bestand <= 0) ---")
    c.execute("""
        SELECT article_nr, 
               COUNT(*) as total_days,
               SUM(CASE WHEN stock <= 0 THEN 1 ELSE 0 END) as oos_days,
               ROUND(100.0 * SUM(CASE WHEN stock <= 0 THEN 1 ELSE 0 END) / COUNT(*), 1) as oos_pct,
               ROUND(AVG(stock), 1) as avg_stock
        FROM daily_stock
        WHERE article_nr IN ('SV-TRA2.G2', 'DTWIS1BBA111111M', 'SH82100', 'SH82300', 
                             'BS52000', 'MK.Z4.30-30.CO.ZK.G2M', 'BO0503131M', 'NME2130S30CSBDM')
        GROUP BY article_nr
        ORDER BY oos_pct DESC
    """)
    for row in c.fetchall():
        print(f"  {row[0]}: {row[3]}% OOS ({row[2]}/{row[1]} Tage), Ø Bestand {row[4]}")
    
    # Stock trend last 12 months for key articles
    print("\n--- Bestands-Trend Top-5 Seller (Monatsdurchschnitt) ---")
    c.execute("""
        SELECT substr(date, 1, 7) as month, article_nr, ROUND(AVG(stock), 0) as avg_stock
        FROM daily_stock
        WHERE article_nr IN ('SV-TRA2.G2', 'DTWIS1BBA111111M', 'BS52000', 'SH82100', 'FRIPA1026')
          AND date >= date('now', '-12 months')
        GROUP BY month, article_nr
        ORDER BY month, article_nr
    """)
    current_month = None
    for row in c.fetchall():
        if row[0] != current_month:
            current_month = row[0]
            print(f"\n  {current_month}:")
        print(f"    {row[1]}: {row[2]}")
    
    conn.close()

if __name__ == "__main__":
    if "--init" in sys.argv:
        build_history()
    elif "--analyze" in sys.argv and len(sys.argv) > 2:
        analyze(sys.argv[2])
    elif "--daily" in sys.argv:
        # For daily cron: just add today
        build_history()
    else:
        print(__doc__)
