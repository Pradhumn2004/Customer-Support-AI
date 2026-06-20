from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse
from backend.app.models.schemas import ChatRequest, ChatResponse
from backend.app.services.agent_service import run_agent_workflow, stream_agent_workflow

router = APIRouter()


@router.post("/", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    try:
        result = await run_agent_workflow(
            message=request.message,
            session_id=request.session_id,
            user_id=request.user_id,
            company_type=request.company_type
        )
        return ChatResponse(**result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/stream")
async def stream_chat_endpoint(request: ChatRequest):
    async def generate():
        async for token in stream_agent_workflow(
            message=request.message,
            session_id=request.session_id,
            user_id=request.user_id,
            company_type=request.company_type
        ):
            yield f"data: {token}\n\n"

    return StreamingResponse(
        generate(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
        }
    )
