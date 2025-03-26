from fastapi import APIRouter, Body, HTTPException
from src.models.chat import ChatMessage, ChatResponse
from src.services.chat_service import ChatService
from src.core.logging import setup_logger as get_logger

router = APIRouter()
chat_service = ChatService()
logger = get_logger("api")

@router.get("/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "ok"}

@router.post("/chat", response_model=ChatResponse)
async def chat(message: ChatMessage) -> ChatResponse:
    """
    Chat endpoint that processes user messages and returns AI responses.
    
    Args:
        message: The user's chat message
        
    Returns:
        ChatResponse: The AI-generated response with sources and confidence score
        
    Raises:
        HTTPException: If there is an error processing the message
    """
    try:
        logger.info(f"Received chat message: {message.message}")
        response = await chat_service.process_message(message.message)
        logger.info(f"Generated response: {response.response}")
        return response
    except Exception as e:
        logger.error(f"Error in chat endpoint: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Error processing chat message: {str(e)}"
        )
