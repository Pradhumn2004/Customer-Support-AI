from langchain_openai import OpenAIEmbeddings
from langchain_community.embeddings import HuggingFaceEmbeddings
from backend.app.core.config import get_settings

settings = get_settings()


def get_openrouter_embeddings():
    return OpenAIEmbeddings(
        model="openai/text-embedding-3-small",
        api_key=settings.OPENROUTER_API_KEY,
        base_url="https://openrouter.ai/api/v1"
    )


def get_local_embeddings(model_name: str = "BAAI/bge-base-en-v1.5", device: str = "cpu"):
    return HuggingFaceEmbeddings(
        model_name=model_name,
        model_kwargs={"device": device},
        encode_kwargs={"normalize_embeddings": True}
    )


def get_embeddings(use_local: bool = False):
    if use_local:
        return get_local_embeddings()
    return get_openrouter_embeddings()
