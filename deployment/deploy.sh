#!/bin/bash
# Safe Production Deployment für mein-malbuch Monitoring
# Heimdall - 2026-01-30

set -e  # Exit on error

echo "🚀 Mein-Malbuch Monitoring Deployment"
echo "======================================"
echo ""

# Configuration
BOT_TOKEN="8485606288:AAEbu1nSZiCiX6OIns_kPd2QzY63TJAP3-Y"
CHAT_ID="1424138659"
PROD_BACKEND="/var/www/mein-malbuch-prod/backend"

echo "📋 Configuration:"
echo "  Bot Token: ${BOT_TOKEN:0:15}..."
echo "  Chat ID: $CHAT_ID"
echo "  Production: $PROD_BACKEND"
echo ""

# Step 1: Backup current production
echo "🔒 Step 1: Creating backup..."
BACKUP_DIR="$HOME/mein-malbuch-backup-$(date +%Y%m%d-%H%M%S)"
mkdir -p "$BACKUP_DIR"
echo "  Backup dir: $BACKUP_DIR"

# We'll backup what we're going to change
if [ -f "$PROD_BACKEND/.env" ]; then
    sudo cp "$PROD_BACKEND/.env" "$BACKUP_DIR/.env.backup"
    echo "  ✅ .env backed up"
fi

if [ -f "$PROD_BACKEND/app/api/webhooks.py" ]; then
    sudo cp "$PROD_BACKEND/app/api/webhooks.py" "$BACKUP_DIR/webhooks.py.backup"
    echo "  ✅ webhooks.py backed up"
fi

echo ""

# Step 2: Copy telegram service
echo "📦 Step 2: Installing Telegram service..."
sudo cp ~/monitoring/production-telegram-service.py "$PROD_BACKEND/app/services/telegram_service.py"
sudo chown www-data:www-data "$PROD_BACKEND/app/services/telegram_service.py"
sudo chmod 644 "$PROD_BACKEND/app/services/telegram_service.py"
echo "  ✅ telegram_service.py installed"
echo ""

# Step 3: Copy monitoring router
echo "📊 Step 3: Installing Monitoring endpoints..."
sudo cp ~/monitoring/production-monitoring-router.py "$PROD_BACKEND/app/api/monitoring.py"
sudo chown www-data:www-data "$PROD_BACKEND/app/api/monitoring.py"
sudo chmod 644 "$PROD_BACKEND/app/api/monitoring.py"
echo "  ✅ monitoring.py installed"
echo ""

# Step 4: Update .env file
echo "⚙️ Step 4: Updating environment variables..."
if [ -f "$PROD_BACKEND/.env" ]; then
    # Check if telegram vars already exist
    if grep -q "TELEGRAM_BOT_TOKEN" "$PROD_BACKEND/.env"; then
        echo "  ⚠️  Telegram vars already exist - skipping"
    else
        sudo bash -c "cat >> $PROD_BACKEND/.env << 'EOF'

# Telegram Monitoring (added by Heimdall)
TELEGRAM_BOT_TOKEN=$BOT_TOKEN
TELEGRAM_CHAT_ID=$CHAT_ID
TELEGRAM_NOTIFICATIONS_ENABLED=true
EOF"
        echo "  ✅ Environment variables added"
    fi
else
    echo "  ❌ .env file not found!"
    exit 1
fi
echo ""

# Step 5: Integration check (don't modify webhooks.py yet - manual step)
echo "🔍 Step 5: Checking integration points..."
echo "  ⚠️  Webhook integration needs manual review"
echo "  📝 See: ~/monitoring/webhook-integration-patch.py"
echo ""

# Step 6: Validation
echo "✅ Step 6: Validation..."
echo "  Files installed:"
ls -lh "$PROD_BACKEND/app/services/telegram_service.py" 2>/dev/null && echo "    ✅ telegram_service.py" || echo "    ❌ telegram_service.py"
ls -lh "$PROD_BACKEND/app/api/monitoring.py" 2>/dev/null && echo "    ✅ monitoring.py" || echo "    ❌ monitoring.py"
echo ""

echo "🎉 Deployment Complete!"
echo ""
echo "📋 Next Steps:"
echo "  1. Add monitoring router to main.py (manual)"
echo "  2. Integrate webhooks (manual - see patch file)"
echo "  3. Restart API (when ready)"
echo "  4. Test /monitoring/health endpoint"
echo ""
echo "🔄 Rollback command:"
echo "  sudo cp $BACKUP_DIR/.env.backup $PROD_BACKEND/.env"
echo "  sudo rm $PROD_BACKEND/app/services/telegram_service.py"
echo "  sudo rm $PROD_BACKEND/app/api/monitoring.py"
echo ""