#!/usr/bin/env python3
import os
import sys
import pytest

if __name__ == "__main__":
    # Add the src directory to the Python path
    src_path = os.path.join(os.path.dirname(__file__), "src")
    sys.path.insert(0, src_path)

    # Run pytest with coverage
    sys.exit(pytest.main([
        "-v",
        "--cov=src",
        "--cov-report=term-missing",
        "tests"
    ]))
