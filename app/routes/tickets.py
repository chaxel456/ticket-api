from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.schemas.ticket import TicketCreate, TicketUpdate, TicketResponse
from app.services.ticket_service import (
    create_ticket,
    get_tickets,
    get_ticket,
    update_ticket,
    delete_ticket
)


router = APIRouter()


@router.post("/tickets", response_model=TicketResponse)
def create_ticket_endpoint(
    ticket: TicketCreate,
    db: Session = Depends(get_db)
):
    new_ticket = create_ticket(db, ticket)

    return new_ticket


@router.get("/tickets", response_model=list[TicketResponse])
def get_tickets_endpoint(
    db: Session = Depends(get_db)
):
    return get_tickets(db)


@router.get("/tickets/{ticket_id}", response_model=TicketResponse)
def get_ticket_endpoint(
    ticket_id: int,
    db: Session = Depends(get_db)
):
    ticket = get_ticket(db, ticket_id)

    if ticket is None:
        raise HTTPException(
            status_code=404,
            detail="Ticket not found"
        )

    return ticket


@router.patch("/tickets/{ticket_id}", response_model=TicketResponse)
def update_ticket_endpoint(
    ticket_id: int,
    ticket_data: TicketUpdate,
    db: Session = Depends(get_db)
):
    ticket = update_ticket(db, ticket_id, ticket_data)

    if ticket is None:
        raise HTTPException(
            status_code=404,
            detail="Ticket not found"
        )

    return ticket


@router.delete("/tickets/{ticket_id}", response_model=TicketResponse)
def delete_ticket_endpoint(
    ticket_id: int,
    db: Session = Depends(get_db)
):
    ticket = delete_ticket(db, ticket_id)

    if ticket is None:
        raise HTTPException(
            status_code=404,
            detail="Ticket not found"
        )

    return ticket