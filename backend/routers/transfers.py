from fastapi import APIRouter
from backend.supabase_client import supabase

router = APIRouter(prefix="/transfers", tags=["Transfers"])


@router.post("/")
def create_transfer(data: dict):

    transfer = supabase.table("transfers").insert(data).execute()

    return transfer.data


@router.get("/")
def get_transfers():
    result = supabase.table("transfers").select("*").execute()
    return result.data



@router.post("/validate/{transfer_id}")
def validate_transfer(transfer_id: int):

    transfer = supabase.table("transfers").select("*").eq("id", transfer_id).execute()
    transfer = transfer.data[0]

    product_id = transfer["product_id"]
    qty = transfer["quantity"]
    from_location = transfer["from_location"]
    to_location = transfer["to_location"]

    product = supabase.table("products").select("*").eq("id", product_id).execute()
    product = product.data[0]

    # update product location
    supabase.table("products").update({
        "location": to_location
    }).eq("id", product_id).execute()

    # log ledger
    supabase.table("stock_ledger").insert({
        "product_id": product_id,
        "operation": "TRANSFER",
        "quantity_change": 0,
        "location": to_location
    }).execute()

    # mark transfer done
    supabase.table("transfers").update({
        "status": "done"
    }).eq("id", transfer_id).execute()

    return {"message": "Transfer completed"}