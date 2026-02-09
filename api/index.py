import sys
import os

# Add the backend directory to the search path to allow imports from it
sys.path.append(os.path.join(os.path.dirname(__file__), "..", "backend"))

from app.main import app
