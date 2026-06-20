import os
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    OPENROUTER_API_KEY: str = ""
    JWT_SECRET: str = "dev-secret-change-me"
    REDIS_URL: str = "redis://localhost:6379"

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        extra = "allow"


def get_settings() -> Settings:
    return Settings()
