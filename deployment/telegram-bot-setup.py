#!/usr/bin/env python3
"""
Interactive Telegram Bot Setup for mein-malbuch monitoring.

This script helps Erik create and configure the Telegram bot.
"""
import asyncio
import httpx
import json
import qrcode
from io import BytesIO
import base64


class TelegramBotSetup:
    """Helper for setting up Telegram monitoring bot."""
    
    def __init__(self):
        self.bot_token = None
        self.chat_id = None
    
    def generate_botfather_instructions(self):
        """Generate step-by-step instructions for BotFather."""
        instructions = """
🤖 TELEGRAM BOT SETUP - SCHRITT FÜR SCHRITT

1. **BotFather öffnen:**
   - Telegram öffnen
   - Nach @BotFather suchen
   - Chat starten mit /start

2. **Bot erstellen:**
   /newbot
   
3. **Bot-Name eingeben:**
   Mein Malbuch Monitor
   
4. **Bot-Username eingeben:**
   mein_malbuch_monitor_bot
   
5. **Token kopieren:**
   Format: 1234567890:AAEhBOBJhJpBJpBJpBJpBJpBJpBJpBJ
   
6. **Bot konfigurieren (optional):**
   /setdescription
   "Monitoring Bot für mein-malbuch.com - Bestellungen & System-Alerts"
   
   /setabouttext  
   "Automatische Benachrichtigungen für neue Bestellungen und System-Status"

7. **Chat-ID ermitteln:**
   - Bot zu gewünschter Gruppe hinzufügen ODER
   - Bot privat anschreiben (/start)
   - Nachricht senden: "Test"

📝 Nach der Erstellung hier den TOKEN eingeben!
        """
        print(instructions)
    
    def validate_token(self, token: str) -> bool:
        """Validate bot token format."""
        if not token or ':' not in token:
            return False
        
        parts = token.split(':')
        if len(parts) != 2:
            return False
        
        try:
            int(parts[0])  # Bot ID should be numeric
            return len(parts[1]) >= 35  # Auth token should be long enough
        except ValueError:
            return False
    
    async def get_bot_info(self, token: str) -> dict:
        """Get bot information to verify token."""
        try:
            async with httpx.AsyncClient() as client:
                response = await client.get(
                    f"https://api.telegram.org/bot{token}/getMe",
                    timeout=10.0
                )
                if response.status_code == 200:
                    return response.json()
                else:
                    return {"error": f"HTTP {response.status_code}"}
        except Exception as e:
            return {"error": str(e)}
    
    async def get_updates(self, token: str) -> dict:
        """Get recent updates to find chat ID."""
        try:
            async with httpx.AsyncClient() as client:
                response = await client.get(
                    f"https://api.telegram.org/bot{token}/getUpdates",
                    timeout=10.0
                )
                if response.status_code == 200:
                    return response.json()
                else:
                    return {"error": f"HTTP {response.status_code}"}
        except Exception as e:
            return {"error": str(e)}
    
    async def send_test_message(self, token: str, chat_id: str) -> dict:
        """Send test message to verify setup."""
        message = """🎉 <b>Mein-Malbuch Monitoring Bot aktiv!</b>

✅ Bot erfolgreich eingerichtet
📦 Bestellungs-Benachrichtigungen: Bereit  
🔧 System-Monitoring: Bereit
⏰ Tägliche Reports: Bereit

👁️ Heimdall wacht über mein-malbuch.com"""
        
        try:
            async with httpx.AsyncClient() as client:
                response = await client.post(
                    f"https://api.telegram.org/bot{token}/sendMessage",
                    json={
                        "chat_id": chat_id,
                        "text": message,
                        "parse_mode": "HTML"
                    },
                    timeout=10.0
                )
                return response.json()
        except Exception as e:
            return {"error": str(e)}
    
    async def interactive_setup(self):
        """Run interactive setup process."""
        print("🚀 MEIN-MALBUCH TELEGRAM BOT SETUP")
        print("="*50)
        
        # Step 1: Instructions
        self.generate_botfather_instructions()
        
        # Step 2: Get token
        while True:
            token = input("\n📥 Bot-Token eingeben: ").strip()
            
            if not self.validate_token(token):
                print("❌ Ungültiges Token-Format. Versuche nochmal.")
                continue
            
            print("🔍 Token wird validiert...")
            bot_info = await self.get_bot_info(token)
            
            if "error" in bot_info:
                print(f"❌ Token-Fehler: {bot_info['error']}")
                continue
            
            if bot_info.get("ok"):
                bot_data = bot_info["result"]
                print(f"✅ Bot gefunden: @{bot_data['username']} ({bot_data['first_name']})")
                self.bot_token = token
                break
            else:
                print("❌ Token ungültig.")
        
        # Step 3: Get Chat ID
        print("\n" + "="*50)
        print("💬 CHAT-ID ERMITTELN")
        print("1. Bot @{} eine Nachricht senden (z.B. 'Test')".format(bot_data['username']))
        print("2. ODER: Bot zu gewünschter Gruppe hinzufügen")
        input("3. ENTER drücken wenn Nachricht gesendet ▶️")
        
        print("🔍 Nach Nachrichten suchen...")
        updates = await self.get_updates(self.bot_token)
        
        if "error" in updates:
            print(f"❌ Fehler beim Abrufen: {updates['error']}")
            return False
        
        if not updates.get("result"):
            print("❌ Keine Nachrichten gefunden. Bot angeschrieben?")
            return False
        
        # Find chat IDs
        chats = set()
        for update in updates["result"]:
            if "message" in update:
                chat = update["message"]["chat"]
                chats.add((chat["id"], chat.get("title", chat.get("first_name", "Private Chat"))))
        
        if not chats:
            print("❌ Keine Chats gefunden.")
            return False
        
        # Select chat
        chat_list = list(chats)
        if len(chat_list) == 1:
            self.chat_id = str(chat_list[0][0])
            print(f"✅ Chat gefunden: {chat_list[0][1]} (ID: {self.chat_id})")
        else:
            print("\n📋 Gefundene Chats:")
            for i, (chat_id, chat_name) in enumerate(chat_list):
                print(f"  {i+1}. {chat_name} (ID: {chat_id})")
            
            while True:
                try:
                    choice = int(input("Chat auswählen (Nummer): ")) - 1
                    if 0 <= choice < len(chat_list):
                        self.chat_id = str(chat_list[choice][0])
                        print(f"✅ Chat ausgewählt: {chat_list[choice][1]}")
                        break
                except ValueError:
                    print("❌ Ungültige Eingabe.")
        
        # Step 4: Test message
        print("\n🧪 Test-Nachricht senden...")
        result = await self.send_test_message(self.bot_token, self.chat_id)
        
        if "error" in result:
            print(f"❌ Test-Nachricht fehlgeschlagen: {result['error']}")
            return False
        
        if result.get("ok"):
            print("✅ Test-Nachricht erfolgreich gesendet!")
            print(f"📱 Check dein Telegram: {chat_list[0][1] if len(chat_list) == 1 else 'ausgewählter Chat'}")
        else:
            print("❌ Test-Nachricht fehlgeschlagen.")
            return False
        
        # Step 5: Generate config
        print("\n" + "="*50)
        print("⚙️ KONFIGURATION GENERIERT:")
        print()
        print("# Telegram Bot Configuration")
        print(f"TELEGRAM_BOT_TOKEN={self.bot_token}")
        print(f"TELEGRAM_CHAT_ID={self.chat_id}")
        print("TELEGRAM_NOTIFICATIONS_ENABLED=true")
        print()
        
        return True


async def main():
    """Run the setup."""
    setup = TelegramBotSetup()
    success = await setup.interactive_setup()
    
    if success:
        print("🎉 SETUP ERFOLGREICH!")
        print("👁️ Heimdall kann jetzt Benachrichtigungen senden.")
    else:
        print("❌ Setup fehlgeschlagen. Nochmal versuchen?")


if __name__ == "__main__":
    asyncio.run(main())