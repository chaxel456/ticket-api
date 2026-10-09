from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.tickets import router as ticket_router


app = FastAPI()


# Allow the frontend to communicate with the API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(ticket_router)


@app.get("/")
def home():
    return {
        "message": "Support API is running"
    }