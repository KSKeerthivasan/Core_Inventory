from fastapi import APIRouter
from backend.supabase_client import supabase

router = APIRouter(prefix="/deliveries", tags=["Deliveries"])


@router.post("/")
def create_delivery(data: dict):

    response = supabase.table("deliveries").insert(data).execute()

    delivery = response.data[0]

    return {
        "message": "Delivery created",
        "delivery_id": delivery["id"]
    }


@router.get("/")
def get_deliveries():
    result = supabase.table("deliveries").select("*").execute()
    return result.data



@router.post("/validate/{delivery_id}")
def validate_delivery(delivery_id: int):

    response = supabase.table("deliveries").select("*").eq("id", delivery_id).execute()

    if len(response.data) == 0:
        return {"error": "Delivery not found"}

    delivery = response.data[0]

    if delivery["status"] == "done":
        return {"error": "Delivery already completed"}

    product_id = delivery["product_id"]
    qty = delivery["quantity"]

    product_res = supabase.table("products").select("*").eq("id", product_id).execute()
    product = product_res.data[0]

    if product["stock"] < qty:
        return {"error": "Not enough stock"}

    new_stock = product["stock"] - qty

    supabase.table("products").update({
        "stock": new_stock
    }).eq("id", product_id).execute()

    supabase.table("stock_ledger").insert({
        "product_id": product_id,
        "operation": "DELIVERY",
        "quantity_change": -qty,
        "location": product["location"]
    }).execute()

    supabase.table("deliveries").update({
        "status": "done"
    }).eq("id", delivery_id).execute()

    return {"message": "Delivery validated"}