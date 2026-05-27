import uuid
from datetime import datetime
from fastapi import APIRouter, HTTPException
from backend.app.models.schemas import TicketCreate, TicketResponse

tickets_store = {}

router = APIRouter()


@router.post("/", response_model=TicketResponse)
async def create_ticket(ticket: TicketCreate):
    ticket_id = f"TKT-{str(uuid.uuid4())[:8].upper()}"

    tickets_store[ticket_id] = {
        "id": ticket_id,
        "user_id": ticket.user_id,
        "subject": ticket.subject,
        "description": ticket.description,
        "priority": ticket.priority,
        "status": "open",
        "created_at": datetime.utcnow().isoformat(),
        "updated_at": datetime.utcnow().isoformat()
    }

    return TicketResponse(
        ticket_id=ticket_id,
        status="open",
        message="Support ticket created successfully"
    )


@router.get("/{ticket_id}", response_model=TicketResponse)
async def get_ticket(ticket_id: str):
    ticket = tickets_store.get(ticket_id)
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket not found")

    return TicketResponse(
        ticket_id=ticket["id"],
        status=ticket["status"],
        message=f"Subject: {ticket['subject']} | Priority: {ticket['priority']}"
    )


@router.post("/escalate", response_model=TicketResponse)
async def escalate_ticket(ticket: TicketCreate):
    return await create_ticket(
        TicketCreate(
            user_id=ticket.user_id,
            subject=f"[ESCALATED] {ticket.subject}",
            description=ticket.description,
            priority="critical"
        )
    )
