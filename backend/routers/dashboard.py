from fastapi import APIRouter
from backend.supabase_client import supabase

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])


@router.get("/")
def get_dashboard():

    products = supabase.table("products").select("*").execute().data
    receipts = supabase.table("receipts").select("*").execute().data
    deliveries = supabase.table("deliveries").select("*").execute().data
    transfers = supabase.table("transfers").select("*").execute().data

    total_products = len(products)

    low_stock = [p for p in products if p["stock"] <= 10]

    pending_receipts = [r for r in receipts if r["status"] != "done"]
    pending_deliveries = [d for d in deliveries if d["status"] != "done"]
    pending_transfers = [t for t in transfers if t["status"] != "done"]

    return {
        "total_products": total_products,
        "low_stock_items": len(low_stock),
        "pending_receipts": len(pending_receipts),
        "pending_deliveries": len(pending_deliveries),
        "pending_transfers": len(pending_transfers)
    }