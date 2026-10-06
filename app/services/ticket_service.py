from sqlalchemy.orm import Session

from app.models.ticket import Ticket


def create_ticket(db: Session, ticket_data):
    ticket = Ticket(
        title=ticket_data.title,
        description=ticket_data.description,
        customer_name=ticket_data.customer_name,
        status="open"
    )

    db.add(ticket)
    db.commit()
    db.refresh(ticket)

    return ticket


def get_tickets(db: Session):
    return db.query(Ticket).all()


def get_ticket(db: Session, ticket_id: int):
    return db.query(Ticket).filter(Ticket.id == ticket_id).first()


def update_ticket(db: Session, ticket_id: int, ticket_data):
    ticket = db.query(Ticket).filter(Ticket.id == ticket_id).first()

    if ticket is None:
        return None

    ticket.status = ticket_data.status

    db.commit()
    db.refresh(ticket)

    return ticket


def delete_ticket(db: Session, ticket_id: int):
    ticket = db.query(Ticket).filter(Ticket.id == ticket_id).first()

    if ticket is None:
        return None

    db.delete(ticket)
    db.commit()

    return ticket