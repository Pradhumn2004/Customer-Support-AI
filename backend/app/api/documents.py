import os
import uuid
from fastapi import APIRouter, UploadFile, File, HTTPException
from backend.app.models.schemas import DocumentUploadResponse
from rag.ingestion.pipeline import ingest_document

router = APIRouter()


@router.post("/upload", response_model=DocumentUploadResponse)
async def upload_document(file: UploadFile = File(...)):
    allowed_extensions = {".pdf", ".docx", ".csv", ".html", ".txt"}
    ext = os.path.splitext(file.filename)[1].lower()

    if ext not in allowed_extensions:
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported file type. Allowed: {allowed_extensions}"
        )

    upload_dir = os.path.join(os.getcwd(), "knowledge_base")
    os.makedirs(upload_dir, exist_ok=True)

    file_id = str(uuid.uuid4())[:8]
    save_path = os.path.join(upload_dir, f"{file_id}_{file.filename}")

    try:
        content = await file.read()
        with open(save_path, "wb") as f:
            f.write(content)

        chunks_created = ingest_document(save_path)

        return DocumentUploadResponse(
            filename=file.filename,
            status="processed",
            chunks_created=chunks_created,
            message=f"Document ingested successfully with {chunks_created} chunks"
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Ingestion failed: {str(e)}")
