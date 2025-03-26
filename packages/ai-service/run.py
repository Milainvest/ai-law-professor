import os
import sys
from pathlib import Path

# Get the absolute path to the project root
project_root = Path(__file__).parent.absolute()

# Add the project root to Python path
sys.path.insert(0, str(project_root))

if __name__ == "__main__":
    import uvicorn
    
    from src.core.config import settings
    
    uvicorn.run(
        "src.main:app",
        host=settings.HOST,
        port=settings.PORT,
        reload=True,
        reload_dirs=[str(project_root / "src")]
    )
