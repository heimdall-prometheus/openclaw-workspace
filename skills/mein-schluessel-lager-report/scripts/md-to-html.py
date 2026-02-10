#!/usr/bin/env python3
"""Convert LAGER-ANALYSE.md to styled HTML for PDF generation."""
import markdown
import sys
import os
from datetime import datetime

# Resolve workspace root
workspace = os.environ.get('WORKSPACE', '/home/reisig/.openclaw/workspace')
input_path = os.path.join(workspace, 'projects/mein-schluessel/LAGER-ANALYSE.md')
output_path = '/tmp/lager-analyse.html'

now = datetime.now()
month_label = now.strftime('%B %Y')

with open(input_path, 'r') as f:
    md_content = f.read()

html_body = markdown.markdown(md_content, extensions=['tables', 'fenced_code'])

html = f"""<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8">
<title>mein-schluessel.de – Lager & Einkaufsanalyse</title>
<style>
  @page {{
    size: A4;
    margin: 12mm 10mm 15mm 10mm;
  }}
  * {{ box-sizing: border-box; }}
  body {{
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 10pt;
    line-height: 1.55;
    color: #1a1a1a;
    max-width: 100%;
    margin: 0;
    padding: 0;
  }}
  h1 {{
    background: linear-gradient(135deg, #1a237e, #283593);
    color: white;
    padding: 18px 24px;
    border-radius: 6px;
    font-size: 18pt;
    margin: 0 0 20px 0;
    page-break-after: avoid;
  }}
  h2 {{
    background: linear-gradient(135deg, #1565c0, #1976d2);
    color: white;
    padding: 10px 16px;
    border-radius: 5px;
    font-size: 13pt;
    margin: 24px 0 12px 0;
    page-break-after: avoid;
  }}
  h3 {{
    color: #1565c0;
    font-size: 11pt;
    margin: 16px 0 8px 0;
    border-bottom: 2px solid #e3f2fd;
    padding-bottom: 4px;
    page-break-after: avoid;
  }}
  table {{
    border-collapse: collapse;
    width: 100%;
    margin: 10px 0 16px 0;
    font-size: 9pt;
    page-break-inside: avoid;
  }}
  th {{
    background: linear-gradient(135deg, #1565c0, #1976d2);
    color: white;
    padding: 8px 10px;
    text-align: left;
    font-weight: 600;
  }}
  td {{
    padding: 6px 10px;
    border-bottom: 1px solid #e0e0e0;
  }}
  tr:nth-child(even) td {{
    background: #f5f8ff;
  }}
  tr:hover td {{
    background: #e3f2fd;
  }}
  strong {{ color: #1a237e; }}
  em {{ color: #666; font-style: italic; }}
  p {{ margin: 6px 0; }}
  ul, ol {{ margin: 6px 0; padding-left: 24px; }}
  li {{ margin: 3px 0; }}
  hr {{
    border: none;
    border-top: 2px solid #e3f2fd;
    margin: 20px 0;
  }}
  blockquote {{
    border-left: 4px solid #1565c0;
    margin: 12px 0;
    padding: 8px 16px;
    background: #f5f8ff;
    border-radius: 0 4px 4px 0;
  }}
  code {{
    background: #f5f5f5;
    padding: 2px 6px;
    border-radius: 3px;
    font-size: 9pt;
  }}
  td:last-child {{
    white-space: nowrap;
  }}
</style>
</head>
<body>
{html_body}
<div style="text-align: center; margin-top: 30px; padding-top: 15px; border-top: 2px solid #e3f2fd; color: #999; font-size: 8pt;">
mein-schluessel.de · Lager & Einkaufsanalyse · {month_label}
</div>
</body>
</html>"""

with open(output_path, 'w') as f:
    f.write(html)
print(f"HTML generated: {len(html):,} bytes → {output_path}")
