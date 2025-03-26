import os
import sys
from pathlib import Path

# Get the absolute path to the project root
project_root = Path(__file__).parent.absolute()

# Add the project root to Python path
sys.path.insert(0, str(project_root))

if __name__ == "__main__":
    import uvicorn
    
    uvicorn.run(
        "src.main:app",
        host="127.0.0.1",
        port=8000,
        reload=True,
        reload_dirs=[str(project_root / "src")]
    )
