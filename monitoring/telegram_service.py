"""
Telegram Notification Service for mein-malbuch monitoring.

Sends notifications for:
- New orders
- Payment failures
- System alerts
- Daily summaries
"""
import asyncio
import httpx
from typing import Optional, Dict, Any
from datetime import datetime
import json


class TelegramService:
    """Service for sending Telegram notifications."""
    
    def __init__(self, bot_token: str, chat_id: str, enabled: bool = True):
        self.bot_token = bot_token
        self.chat_id = chat_id
        self.enabled = enabled
        self.base_url = f"https://api.telegram.org/bot{bot_token}"
    
    async def send_message(self, text: str, parse_mode: str = "HTML") -> bool:
        """Send a message to the configured chat."""
        if not self.enabled or not self.bot_token or not self.chat_id:
            print(f"[TELEGRAM] Service disabled or not configured")
            return False
        
        try:
            async with httpx.AsyncClient() as client:
                response = await client.post(
                    f"{self.base_url}/sendMessage",
                    json={
                        "chat_id": self.chat_id,
                        "text": text,
                        "parse_mode": parse_mode,
                        "disable_web_page_preview": True
                    },
                    timeout=10.0
                )
                
                if response.status_code == 200:
                    print(f"[TELEGRAM] Message sent successfully")
                    return True
                else:
                    print(f"[TELEGRAM] Failed to send message: {response.status_code} - {response.text}")
                    return False
        
        except Exception as e:
            print(f"[TELEGRAM] Error sending message: {e}")
            return False
    
    async def notify_new_order(self, order: Dict[str, Any]) -> bool:
        """Send notification for new order."""
        order_id = order.get("id", "Unknown")
        total_price = order.get("total_price", 0)
        quantity = order.get("quantity", 1)
        shipping_name = order.get("shipping_name", "Unknown")
        book_title = order.get("book_title", "Malbuch")
        payment_method = order.get("payment_method_type", "card")
        
        # Format discount info if present
        discount_text = ""
        if order.get("discount_amount") and order.get("discount_amount") > 0:
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
        
        return await self.send_message(message)
    
    async def notify_payment_failed(self, order_id: str, error: str) -> bool:
        """Send notification for failed payment."""
        message = f"""❌ <b>Zahlung fehlgeschlagen</b>
        
📦 Bestellung #{order_id}
❗ Fehler: {error}

⏰ {datetime.now().strftime('%d.%m.%Y %H:%M')}"""
        
        return await self.send_message(message)
    
    async def notify_refund(self, order_id: str, amount: float) -> bool:
        """Send notification for refund."""
        message = f"""💰 <b>Rückerstattung</b>
        
📦 Bestellung #{order_id}
💸 Betrag: {amount}€

⏰ {datetime.now().strftime('%d.%m.%Y %H:%M')}"""
        
        return await self.send_message(message)
    
    async def notify_system_alert(self, alert_type: str, message: str, severity: str = "warning") -> bool:
        """Send system alert notification."""
        emoji = "🚨" if severity == "critical" else "⚠️" if severity == "warning" else "ℹ️"
        
        alert_message = f"""{emoji} <b>System Alert</b>
        
🏷️ Type: {alert_type}
📝 Message: {message}
🔴 Severity: {severity}

⏰ {datetime.now().strftime('%d.%m.%Y %H:%M')}
🖥️ Server: mein-malbuch"""
        
        return await self.send_message(alert_message)
    
    async def notify_daily_summary(self, stats: Dict[str, Any]) -> bool:
        """Send daily summary."""
        orders_today = stats.get("orders_today", 0)
        revenue_today = stats.get("revenue_today", 0)
        orders_pending = stats.get("orders_pending", 0)
        system_health = stats.get("system_health", "unknown")
        
        health_emoji = "✅" if system_health == "healthy" else "⚠️" if system_health == "warning" else "🚨"
        
        message = f"""📊 <b>Tagesbericht {datetime.now().strftime('%d.%m.%Y')}</b>
        
📦 Bestellungen heute: {orders_today}
💰 Umsatz heute: {revenue_today}€
⏳ Pending Orders: {orders_pending}
{health_emoji} System: {system_health}

🖥️ Server: mein-malbuch"""
        
        return await self.send_message(message)


# Singleton instance (to be initialized with settings)
telegram_service: Optional[TelegramService] = None


def init_telegram_service(bot_token: str, chat_id: str, enabled: bool = True) -> None:
    """Initialize the global telegram service."""
    global telegram_service
    telegram_service = TelegramService(bot_token, chat_id, enabled)


def get_telegram_service() -> Optional[TelegramService]:
    """Get the global telegram service instance."""
    return telegram_service