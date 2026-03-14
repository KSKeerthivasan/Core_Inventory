from fastapi import APIRouter, HTTPException
from backend.supabase_client import supabase
from postgrest.exceptions import APIError

router = APIRouter(prefix="/products", tags=["Products"])


@router.get("/")
def get_products():

    response = supabase.table("products").select("*").execute()

    return response.data


@router.post("/")
def create_product(product: dict):

    try:
        response = supabase.table("products").insert(product).execute()

        # log initial stock if exists
        if product.get("stock", 0) > 0:

            supabase.table("stock_ledger").insert({
                "product_id": response.data[0]["id"],
                "operation": "INITIAL_STOCK",
                "quantity_change": product["stock"],
                "location": product["location"]
            }).execute()

        return response.data

    except APIError as e:

        if "duplicate key value" in str(e):
            raise HTTPException(status_code=400, detail="SKU already exists")

        raise HTTPException(status_code=500, detail="Database error")