#!/bin/bash
# mein-schluessel.de Daily Orders Report
# Usage: ./daily-orders.sh [YYYY-MM-DD]
# Default: yesterday

set -euo pipefail

DATE="${1:-$(date -d 'yesterday' +%Y-%m-%d)}"
SSH_KEY="credentials/mein-schluessel/erik_id_ed25519"
SSH_HOST="meinschluesselde@116.202.162.231"
DB_CONN="mysql -h 127.0.0.1 -P 3307 -u mein_schluessel_prod -pUJHnY5X4ALsy377cnW6HZP5xGrcKetH3 mein_schluessel_prod -N"

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
WORKSPACE="$(cd "$SCRIPT_DIR/../../.." && pwd)"
SSH_KEY_PATH="$WORKSPACE/$SSH_KEY"

SUMMARY_SQL=$(cat <<EOSQL
SELECT COUNT(DISTINCT o.order_number), ROUND(SUM(o.amount_net),2), ROUND(SUM(o.amount_total),2), ROUND(AVG(o.amount_net),2) FROM \\\`order\\\` o JOIN state_machine_state smst ON o.state_id=smst.id WHERE DATE(o.order_date_time)='${DATE}' AND o.version_id=0x0FA91CE3E96A4BC2BE4BD9CE752C3425 AND smst.technical_name!='cancelled';
EOSQL
)

PRODUCTS_SQL=$(cat <<EOSQL
SELECT oli.label, SUM(oli.quantity), ROUND(oli.unit_price,2), ROUND(SUM(oli.total_price),2) FROM \\\`order\\\` o JOIN order_line_item oli ON oli.order_id=o.id AND oli.order_version_id=o.version_id JOIN state_machine_state smst ON o.state_id=smst.id WHERE DATE(o.order_date_time)='${DATE}' AND o.version_id=0x0FA91CE3E96A4BC2BE4BD9CE752C3425 AND smst.technical_name!='cancelled' AND oli.type='product' GROUP BY oli.product_id, oli.label, oli.unit_price ORDER BY SUM(oli.total_price) DESC;
EOSQL
)

echo "=== SUMMARY ==="
echo "bestellungen	netto	brutto	avg_netto"
ssh -i "$SSH_KEY_PATH" "$SSH_HOST" "$DB_CONN -e \"$SUMMARY_SQL\"" 2>/dev/null

echo ""
echo "=== PRODUCTS ==="
echo "produkt	menge	stueckpreis	gesamt_netto"
ssh -i "$SSH_KEY_PATH" "$SSH_HOST" "$DB_CONN -e \"$PRODUCTS_SQL\"" 2>/dev/null
