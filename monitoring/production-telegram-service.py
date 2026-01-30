"""
Production-ready Telegram service for mein-malbuch.

This file goes into: /var/www/mein-malbuch-prod/backend/app/services/telegram_service.py
"""
import asyncio
import subprocess
import json
from typing import Optional, Dict, Any
from datetime import datetime
import os


class TelegramService:
    """Service for sending Telegram notifications."""
    
    def __init__(self, bot_token: str, chat_id: str, enabled: bool = True):
        self.bot_token = bot_token
        self.chat_id = chat_id
        self.enabled = enabled
        self.base_url = f"https://api.telegram.org/bot{bot_token}"
    
    def send_message_sync(self, text: str, parse_mode: str = "HTML") -> bool:
        """Send a message using curl (sync) - works without httpx."""
        if not self.enabled or not self.bot_token or not self.chat_id:
            print(f"[TELEGRAM] Service disabled or not configured")
            return False
        
        try:
            # Escape text for JSON
            text_escaped = json.dumps(text)
            chat_id_escaped = json.dumps(self.chat_id)
            parse_mode_escaped = json.dumps(parse_mode)
            
            # Use curl to send message
            cmd = [
                "curl", "-s", "-X", "POST",
                f"{self.base_url}/sendMessage",
                "-H", "Content-Type: application/json",
                "-d", f'{{"chat_id":{chat_id_escaped},"text":{text_escaped},"parse_mode":{parse_mode_escaped},"disable_web_page_preview":true}}'
            ]
            
            result = subprocess.run(cmd, capture_output=True, text=True, timeout=10)
            
            if result.returncode == 0:
                response = json.loads(result.stdout)
                if response.get("ok"):
                    print(f"[TELEGRAM] Message sent successfully")
                    return True
                else:
                    print(f"[TELEGRAM] API error: {response.get('description', 'Unknown')}")
            else:
                print(f"[TELEGRAM] curl failed: {result.stderr}")
            
            return False
        
        except Exception as e:
            print(f"[TELEGRAM] Error sending message: {e}")
            return False
    
    def notify_new_order_sync(self, order: Dict[str, Any]) -> bool:
        """Send notification for new order (sync version)."""
        order_id = order.get("id", "Unknown")
        total_price = order.get("total_price", 0)
        quantity = order.get("quantity", 1)
        shipping_name = order.get("shipping_name", "Unknown")
        book_title = order.get("book_title", "Malbuch")
        payment_method = order.get("payment_method_type", "card")
        
        # Format discount info if present
        discount_text = ""
        if order.get("discount_amount") and float(order.get("discount_amount", 0)) > 0:
            discount_text = f"\\n💸 Rabatt: -{order['discount_amount']}€"
            if order.get("discount_code"):
                discount_text += f" (Code: {order['discount_code']})"
        
        message = f"""🎉 <b>Neue Bestellung!</b>
        
📦 Bestellung #{order_id}
👤 Kunde: {shipping_name}
📚 Buch: {book_title}
📊 Anzahl: {quantity}x
💰 Betrag: {total_price}€{discount_text}
💳 Zahlung: {payment_method}

⏰ {datetime.now().strftime('%d.%m.%Y %H:%M')}"""
        
        return self.send_message_sync(message)
    
    def notify_payment_failed_sync(self, order_id: str, error: str) -> bool:
        """Send notification for failed payment (sync version)."""
        message = f"""❌ <b>Zahlung fehlgeschlagen</b>
        
📦 Bestellung #{order_id}
❗ Fehler: {error}

⏰ {datetime.now().strftime('%d.%m.%Y %H:%M')}"""
        
        return self.send_message_sync(message)
    
    def notify_refund_sync(self, order_id: str, amount: float) -> bool:
        """Send notification for refund (sync version)."""
        message = f"""💰 <b>Rückerstattung</b>
        
📦 Bestellung #{order_id}
💸 Betrag: {amount:.2f}€

⏰ {datetime.now().strftime('%d.%m.%Y %H:%M')}"""
        
        return self.send_message_sync(message)
    
    def notify_system_alert_sync(self, alert_type: str, message: str, severity: str = "warning") -> bool:
        """Send system alert notification (sync version)."""
        emoji = "🚨" if severity == "critical" else "⚠️" if severity == "warning" else "ℹ️"
        
        alert_message = f"""{emoji} <b>System Alert</b>
        
🏷️ Type: {alert_type}
📝 Message: {message}
🔴 Severity: {severity}

⏰ {datetime.now().strftime('%d.%m.%Y %H:%M')}
🖥️ Server: mein-malbuch"""
        
        return self.send_message_sync(alert_message)


# Global service instance
_telegram_service: Optional[TelegramService] = None


def init_telegram_service(bot_token: str, chat_id: str, enabled: bool = True) -> None:
    """Initialize the global telegram service."""
    global _telegram_service
    _telegram_service = TelegramService(bot_token, chat_id, enabled)
    print(f"[TELEGRAM] Service initialized (enabled: {enabled})")


def get_telegram_service() -> Optional[TelegramService]:
    """Get the global telegram service instance."""
    return _telegram_service


# Auto-initialize from environment variables
def auto_init_from_env():
    """Auto-initialize service from environment variables."""
    bot_token = os.getenv("TELEGRAM_BOT_TOKEN")
    chat_id = os.getenv("TELEGRAM_CHAT_ID") 
    enabled = os.getenv("TELEGRAM_NOTIFICATIONS_ENABLED", "false").lower() == "true"
    
    if bot_token and chat_id:
        init_telegram_service(bot_token, chat_id, enabled)
        return True
    else:
        print("[TELEGRAM] Not configured (missing bot_token or chat_id)")
        return False


# Auto-initialize when module is imported
auto_init_from_env()