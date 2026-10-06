from fastapi import FastAPI

from app.routes.tickets import router as ticket_router


app = FastAPI()

app.include_router(ticket_router)


@app.get("/")
def home():
    return {
        "message": "Support API is running"
    }