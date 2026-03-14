from fastapi import APIRouter
from backend.supabase_client import supabase

router = APIRouter(prefix="/adjustments", tags=["Adjustments"])


@router.post("/")
def adjust_stock(data: dict):

    product_id = data["product_id"]
    new_qty = data["new_quantity"]

    product = supabase.table("products").select("*").eq("id", product_id).execute()
    product = product.data[0]

    old_qty = product["stock"]
    difference = new_qty - old_qty

    # update stock
    supabase.table("products").update({
        "stock": new_qty
    }).eq("id", product_id).execute()

    # save adjustment record
    supabase.table("adjustments").insert({
        "product_id": product_id,
        "old_quantity": old_qty,
        "new_quantity": new_qty,
        "difference": difference
    }).execute()

    # ledger entry
    supabase.table("stock_ledger").insert({
        "product_id": product_id,
        "operation": "ADJUSTMENT",
        "quantity_change": difference,
        "location": product["location"]
    }).execute()

    return {"message": "Stock adjusted successfully"}



@router.get("/")
def get_adjustments():
    result = supabase.table("adjustments").select("*").execute()
    return result.data