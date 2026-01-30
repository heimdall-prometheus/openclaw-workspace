"""
Extended webhook handlers with Telegram notifications.

This file shows the modifications needed for app/api/webhooks.py
to integrate Telegram notifications for order events.
"""

# Add these imports to the top of webhooks.py
from app.services.telegram_service import get_telegram_service
from app.services.system_monitor import get_system_monitor
import asyncio

# Add this after handle_checkout_completed function processes the order
async def handle_checkout_completed_extended(db: Session, session: dict):
    """
    Extended version with Telegram notifications.
    """
    # ... existing code ... 
    
    # After order is marked as paid and email is sent, add:
    
    # Send Telegram notification for new order
    telegram = get_telegram_service()
    if telegram and order.paid_at:
        try:
            # Format order data for notification
            order_data = {
                "id": order.id,
                "total_price": float(order.total_price),
                "quantity": order.quantity,
                "shipping_name": order.shipping_name,
                "book_title": book_title,  # Already extracted above
                "payment_method_type": payment_method_type,
                "discount_amount": float(order.discount_amount) if order.discount_amount else 0,
                "discount_code": order.discount_code
            }
            
            # Send notification asynchronously
            asyncio.create_task(telegram.notify_new_order(order_data))
            print(f"[TELEGRAM] Notification queued for order {order.id}")
            
        except Exception as e:
            print(f"[TELEGRAM] Failed to send order notification: {e}")


# Add to handle_payment_failed function
async def handle_payment_failed_extended(db: Session, payment_intent: dict):
    """
    Extended version with Telegram notifications.
    """
    # ... existing code ...
    
    # Send Telegram notification for failed payment
    telegram = get_telegram_service()
    if telegram and order_id:
        try:
            asyncio.create_task(
                telegram.notify_payment_failed(
                    order_id=str(order_id),
                    error=f"{error_code}: {error_message}"
                )
            )
            print(f"[TELEGRAM] Payment failure notification queued for order {order_id}")
            
        except Exception as e:
            print(f"[TELEGRAM] Failed to send payment failure notification: {e}")


# Add to handle_charge_refunded function  
async def handle_charge_refunded_extended(db: Session, charge: dict):
    """
    Extended version with Telegram notifications.
    """
    # ... existing code ...
    
    # Send Telegram notification for refund
    telegram = get_telegram_service()
    if telegram and order_id:
        try:
            amount_eur = amount_refunded / 100
            asyncio.create_task(
                telegram.notify_refund(
                    order_id=str(order_id),
                    amount=amount_eur
                )
            )
            print(f"[TELEGRAM] Refund notification queued for order {order_id}")
            
        except Exception as e:
            print(f"[TELEGRAM] Failed to send refund notification: {e}")