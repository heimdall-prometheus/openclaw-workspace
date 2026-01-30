"""
Webhook Integration Patch für mein-malbuch.

Diese Änderungen müssen in /var/www/mein-malbuch-prod/backend/app/api/webhooks.py eingefügt werden.
"""

# 1. ADD TO TOP OF FILE (after existing imports):
"""
# Add this import after the existing imports
try:
    from app.services.telegram_service import get_telegram_service
except ImportError:
    print("[WEBHOOK] Telegram service not available")
    def get_telegram_service():
        return None
"""

# 2. MODIFY handle_checkout_completed function
# ADD THIS AFTER THE ORDER IS MARKED AS PAID (after "print(f"[STRIPE WEBHOOK] Order {order_id} marked as paid via webhook")")
"""
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
                
                # Send notification (sync call - webhook needs to be fast)
                success = telegram.notify_new_order_sync(order_data)
                if success:
                    print(f"[TELEGRAM] Order notification sent for order {order.id}")
                else:
                    print(f"[TELEGRAM] Failed to send order notification for order {order.id}")
                
            except Exception as e:
                print(f"[TELEGRAM] Error sending order notification: {e}")
"""

# 3. MODIFY handle_payment_failed function  
# ADD THIS AFTER THE EXISTING ERROR LOGGING:
"""
    # Send Telegram notification for failed payment
    telegram = get_telegram_service()
    if telegram and order_id:
        try:
            success = telegram.notify_payment_failed_sync(
                order_id=str(order_id),
                error=f"{error_code}: {error_message}"
            )
            if success:
                print(f"[TELEGRAM] Payment failure notification sent for order {order_id}")
        except Exception as e:
            print(f"[TELEGRAM] Error sending payment failure notification: {e}")
"""

# 4. MODIFY handle_charge_refunded function
# ADD THIS AFTER THE EXISTING REFUND LOGGING:  
"""
    # Send Telegram notification for refund
    telegram = get_telegram_service()
    if telegram and order_id:
        try:
            amount_eur = amount_refunded / 100
            success = telegram.notify_refund_sync(
                order_id=str(order_id),
                amount=amount_eur
            )
            if success:
                print(f"[TELEGRAM] Refund notification sent for order {order_id}")
        except Exception as e:
            print(f"[TELEGRAM] Error sending refund notification: {e}")
"""

# Example of complete modified function:
"""
async def handle_checkout_completed(db: Session, session: dict):
    # ... existing code ...
    
    # After order is marked as paid and email is sent:
    print(f"[STRIPE WEBHOOK] Order {order_id} marked as paid via webhook")
    
    # NEW: Send Telegram notification for new order
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
            
            # Send notification (sync call - webhook needs to be fast)
            success = telegram.notify_new_order_sync(order_data)
            if success:
                print(f"[TELEGRAM] Order notification sent for order {order.id}")
            else:
                print(f"[TELEGRAM] Failed to send order notification for order {order.id}")
            
        except Exception as e:
            print(f"[TELEGRAM] Error sending order notification: {e}")
    
    # ... rest of existing code ...
"""