from langchain.tools import tool
import requests


@tool
def get_order_status(order_id: str) -> str:
    """Get the current status of a customer order by order ID."""
    return (
        f"Order {order_id}: Shipped — "
        f"Estimated delivery: 2-3 business days. "
        f"Tracking: TRK-{order_id}-2024"
    )


@tool
def check_refund_eligibility(order_id: str, reason: str = "") -> str:
    """Check if an order is eligible for a refund."""
    return (
        f"Order {order_id} is eligible for a full refund. "
        f"Refund policy: 30-day money-back guarantee from date of purchase. "
        f"Processing time: 5-7 business days after approval."
    )


@tool
def get_product_info(product_id: str) -> str:
    """Get detailed information about a product by product ID."""
    return (
        f"Product {product_id}: Premium Enterprise Plan. "
        f"Price: $99/month. Features: Unlimited users, 24/7 support, "
        f"Advanced analytics, Custom integrations, SLA guarantee."
    )


@tool
def check_account_status(user_id: str) -> str:
    """Check the status of a customer account."""
    return (
        f"Account {user_id}: Active. "
        f"Plan: Enterprise. "
        f"Renewal date: 2026-12-31. "
        f"Open tickets: 0."
    )


tools = [get_order_status, check_refund_eligibility, get_product_info, check_account_status]
