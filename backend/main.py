from fastapi import FastAPI
from backend.router import router_crypto


app = FastAPI()

app.include_router(router=router_crypto)
