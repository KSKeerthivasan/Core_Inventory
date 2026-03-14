from fastapi import APIRouter
from backend.supabase_client import supabase

router = APIRouter(prefix="/receipts", tags=["Receipts"])


@router.post("/")
def create_receipt(data: dict):

    response = supabase.table("receipts").insert(data).execute()

    receipt = response.data[0]

    return {
        "message": "Receipt created",
        "receipt_id": receipt["id"],
        "data": receipt
    }

@router.get("/")
def get_receipts():
    response = supabase.table("receipts").select("*").execute()
    return response.data



@router.post("/validate/{receipt_id}")
def validate_receipt(receipt_id: int):

    response = supabase.table("receipts").select("*").eq("id", receipt_id).execute()

    if len(response.data) == 0:
        return {"error": "Receipt not found"}

    receipt = response.data[0]

    if receipt["status"] == "done":
        return {"error": "Receipt already validated"}

    product_id = receipt["product_id"]
    qty = receipt["quantity"]

    product_res = supabase.table("products").select("*").eq("id", product_id).execute()
    product = product_res.data[0]

    new_stock = product["stock"] + qty

    supabase.table("products").update({
        "stock": new_stock
    }).eq("id", product_id).execute()

    supabase.table("stock_ledger").insert({
        "product_id": product_id,
        "operation": "RECEIPT",
        "quantity_change": qty,
        "location": product["location"]
    }).execute()

    supabase.table("receipts").update({
        "status": "done"
    }).eq("id", receipt_id).execute()

    return {"message": "Receipt validated", "receipt_id": receipt_id}