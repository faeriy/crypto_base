from fastapi import APIRouter
from backend.init import cmc_client


router_crypto = APIRouter(
    prefix="/cryptocurrencies"
)


@router_crypto.get("")
async def get_cryptocurrencies():
    return await cmc_client.get_listings()


@router_crypto.get("/{currency_id}")
async def get_cryptocurrency(currency_id: int):
    return await cmc_client.get_currency(currency_id=currency_id)
