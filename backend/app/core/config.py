import os
from pydantic_settings import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    OPENROUTER_API_KEY: str = ""
    LANGCHAIN_API_KEY: str = ""
    LANGCHAIN_TRACING_V2: str = "false"
    LANGCHAIN_PROJECT: str = "customer-support-ai-agent"
    NEO4J_URI: str = "bolt://localhost:7687"
    NEO4J_USERNAME: str = "neo4j"
    NEO4J_PASSWORD: str = "password"
    JWT_SECRET: str = "dev-secret-change-me"
    REDIS_URL: str = "redis://localhost:6379"
    CHROMA_PERSIST_DIR: str = "./chroma_db"
    COMPANY_NAME: str = "TechCorp"
    COMPANY_TYPE: str = "a SaaS technology company"

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        extra = "allow"

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        if "placeholder" in self.LANGCHAIN_API_KEY.lower() or self.LANGCHAIN_API_KEY == "":
            self.LANGCHAIN_TRACING_V2 = "false"
            os.environ["LANGCHAIN_TRACING_V2"] = "false"


def get_settings() -> Settings:
    return Settings()
