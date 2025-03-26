from fastapi import Request
from typing import Callable, Awaitable
from starlette.types import ASGIApp, Scope, Receive, Send
from src.core.logging import setup_logger

logger = setup_logger(__name__)

class LoggingMiddleware:
    def __init__(self, app: ASGIApp):
        self.app = app

    async def __call__(self, scope: Scope, receive: Receive, send: Send) -> None:
        if scope["type"] != "http":
            await self.app(scope, receive, send)
            return

        request = Request(scope, receive)
        logger.info(f"Request: {request.method} {request.url.path}")
        
        try:
            async def send_wrapper(message):
                if message["type"] == "http.response.start":
                    logger.info(
                        f"Response: {request.method} {request.url.path} - "
                        f"Status: {message['status']}"
                    )
                await send(message)

            await self.app(scope, receive, send_wrapper)
            
        except Exception as e:
            logger.error(
                f"Error processing request: {request.method} {request.url.path} - "
                f"Error: {str(e)}"
            )
            raise
