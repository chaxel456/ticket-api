from pydantic import BaseModel


class TicketCreate(BaseModel):
    title: str
    description: str
    customer_name: str


class TicketUpdate(BaseModel):
    status: str


class TicketResponse(BaseModel):
    id: int
    title: str
    description: str
    customer_name: str
    status: str