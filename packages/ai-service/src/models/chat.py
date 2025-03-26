from typing import List, Optional
from pydantic import BaseModel, Field

class ChatMessage(BaseModel):
    """Model for chat messages from users."""
    message: str = Field(..., description="The message content from the user")

class Source(BaseModel):
    """Model for source information."""
    title: str = Field(..., description="Title of the source")
    url: Optional[str] = Field(None, description="URL of the source if available")
    content_snippet: str = Field(..., description="Relevant snippet from the source")

class ChatResponse(BaseModel):
    """Model for chat responses."""
    response: str = Field(..., description="The generated response")
    sources: List[Source] = Field(default_factory=list, description="List of sources used for the response")
    confidence_score: float = Field(..., ge=0.0, le=1.0, description="Confidence score of the response") 