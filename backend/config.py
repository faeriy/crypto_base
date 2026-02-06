from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    CMC_API_KEY: str = ""
    CMC_BASE_URL: str = "https://pro-api.coinmarketcap.com/v1"

    model_config = SettingsConfigDict(env_file=".env")


settings = Settings()
