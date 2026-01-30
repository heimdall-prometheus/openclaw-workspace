# Telegram Bot Setup für mein-malbuch Monitoring

## Bot erstellen

1. **BotFather kontaktieren:**
   ```
   /start
   /newbot
   Mein Malbuch Monitor
   mein_malbuch_monitor_bot
   ```

2. **Bot-Token erhalten** (Format: 1234567890:AAEhBOBJhJpBJpBJpBJpBJpBJpBJpBJ)

3. **Chat-ID ermitteln:**
   ```
   # Bot zu Gruppe hinzufügen oder direkt anschreiben
   # Dann: https://api.telegram.org/bot[TOKEN]/getUpdates
   ```

## Umgebungsvariablen

Zu `.env.prod` hinzufügen:
```bash
# Telegram Monitoring
TELEGRAM_BOT_TOKEN=1234567890:AAEhBOBJhJpBJpBJpBJpBJpBJpBJpBJ
TELEGRAM_CHAT_ID=-1001234567890  # Gruppe oder private Chat
TELEGRAM_NOTIFICATIONS_ENABLED=true
```

## Benachrichtigungs-Types

- ✅ **Neue Bestellung** (checkout.session.completed)
- ❌ **Fehlgeschlagene Zahlung** (payment_intent.payment_failed)  
- 💰 **Rückerstattung** (charge.refunded)
- 🔧 **System-Alerts** (CPU, Memory, Disk)
- 📊 **Tägliche Zusammenfassung**

## Nächste Schritte

1. Bot-Token von Erik erhalten
2. Telegram-Service implementieren
3. Webhook-Handler erweitern
4. System-Monitoring hinzufügen