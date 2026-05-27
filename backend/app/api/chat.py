from fastapi import APIRouter, HTTPException
from backend.app.models.schemas import ChatRequest, ChatResponse
from backend.app.services.agent_service import run_agent_workflow

router = APIRouter()


@router.post("/", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    try:
        result = await run_agent_workflow(
            message=request.message,
            session_id=request.session_id,
            user_id=request.user_id
        )
        return ChatResponse(**result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/stream")
async def stream_chat_endpoint(request: ChatRequest):
    from fastapi.responses import StreamingResponse

    async def generate():
        from backend.app.services.agent_service import stream_agent_workflow
        async for chunk in stream_agent_workflow(
            message=request.message,
            session_id=request.session_id,
            user_id=request.user_id
        ):
            yield f"data: {chunk}\n\n"

    return StreamingResponse(generate(), media_type="text/event-stream")
