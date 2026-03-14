from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.routers import products

from backend.routers import receipts

from backend.routers import deliveries

from backend.routers import transfers

from backend.routers import adjustments

from backend.routers import dashboard

from backend.routers import users

app = FastAPI(title="CoreInventory")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(products.router)

app.include_router(receipts.router)

app.include_router(deliveries.router)

app.include_router(transfers.router)

app.include_router(adjustments.router)

app.include_router(dashboard.router)

app.include_router(users.router)