from fastapi import APIRouter
from backend.supabase_client import supabase

router = APIRouter(prefix="/users", tags=["Users"])


@router.post("/create")
def create_user(data: dict):

    response = supabase.table("users").insert(data).execute()

    return response.data

@router.get("/{user_id}")
def get_user(user_id: str):

    response = supabase.table("users").select("*").eq("id", user_id).execute()

    return response.data[0]