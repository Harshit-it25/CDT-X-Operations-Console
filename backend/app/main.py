"""
CDT-X: Behavioral Digital Twin Examination Integrity Platform
FastAPI Application Entry Point
"""

import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, Base
from app.routers import api_router

# Initialize FastAPI App
app = FastAPI(
    title="CDT-X Behavioral Integrity Engine",
    description=(
        "Production-grade Cognitive Digital Twin Integrity platform API. "
        "Continuously evaluates student physical keystroke/mouse/navigation telemetry "
        "against historical identity signatures via multi-agent intelligence."
    ),
    version="1.4.2",
    docs_url="/docs",
    redoc_url="/redoc",
)

# Set CORS origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create database tables on startup (For SQLite development falling back from PostgreSQL)
@app.on_event("startup")
def on_startup():
    Base.metadata.create_all(bind=engine)

# Include API Router
app.include_router(api_router)

@app.get("/", tags=["Root"])
def read_root():
    return {
        "engine": "CDT-X Behavioral Alignment Core",
        "status": "ONLINE",
        "version": "1.4.2",
        "documentation": "/docs"
    }

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
