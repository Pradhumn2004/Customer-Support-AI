from pydantic import BaseModel, Field
from typing import Optional, List


class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=4000)
    session_id: str = Field(..., min_length=1)
    user_id: Optional[str] = None


class ChatResponse(BaseModel):
    response: str
    sources: List[str] = Field(default_factory=list)
    escalated: bool = False
    ticket_id: Optional[str] = None
    intent: Optional[str] = None
    sentiment: Optional[str] = None


class DocumentUploadResponse(BaseModel):
    filename: str
    status: str
    chunks_created: int
    message: str


class TicketCreate(BaseModel):
    user_id: str
    subject: str
    description: str
    priority: str = Field(default="medium", pattern="^(low|medium|high|critical)$")


class TicketResponse(BaseModel):
    ticket_id: str
    status: str
    message: str


class FeedbackRequest(BaseModel):
    session_id: str
    message_id: str
    rating: int = Field(..., ge=1, le=5)
    comment: Optional[str] = None


class HealthResponse(BaseModel):
    status: str
    services: dict
