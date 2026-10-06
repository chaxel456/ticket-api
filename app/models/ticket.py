from sqlalchemy import Column, Integer, String, Text

from app.database.connection import Base


class Ticket(Base):
    __tablename__ = "tickets"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(Text, nullable=False)
    customer_name = Column(String, nullable=False)
    status = Column(String, default="open")