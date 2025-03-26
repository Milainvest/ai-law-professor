from fastapi import APIRouter, Body
from pydantic import BaseModel

class ChatMessage(BaseModel):
    message: str

router = APIRouter()

@router.get("/health")
async def health_check():
    return {"status": "ok"}

@router.post("/chat")
async def chat(message: ChatMessage):
    # TODO: Implement chat functionality
    return {"response": f"Received message: {message.message}"}
