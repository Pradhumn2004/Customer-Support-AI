from pydantic import BaseModel, Field
from typing import Optional, List


class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=4000)
    session_id: str = Field(..., min_length=1)
    user_id: Optional[str] = None
    company_type: str = Field(default="tech", pattern="^(tech|fashion|shopping|finance|healthcare|education)$")


class ChatResponse(BaseModel):
    response: str
    escalated: bool = False
    ticket_id: Optional[str] = None
    intent: Optional[str] = None
    sentiment: Optional[str] = None


class TicketCreate(BaseModel):
    user_id: str
    subject: str
    description: str
    priority: str = Field(default="medium", pattern="^(low|medium|high|critical)$")


class TicketResponse(BaseModel):
    ticket_id: str
    status: str
    message: str
