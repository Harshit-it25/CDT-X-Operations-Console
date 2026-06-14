"""
SQLAlchemy Database Connection & Session Configuration
CDT-X Enterprise Integrity Backend
"""

import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Resolve Database URL, default to local SQLite for frictionless startup
DATABASE_URL = os.getenv(
    "DATABASE_URL", 
    "postgresql://postgres:postgres@localhost:5432/cdtx_integrity"
)

# Handle SQLite specific parameter if fallback URL is used
if DATABASE_URL.startswith("sqlite"):
    connect_args = {"check_same_thread": False}
    engine = create_engine(DATABASE_URL, connect_args=connect_args)
else:
    # Use standard Postgres Connection Pool parameters for high-throughput
    engine = create_engine(
        DATABASE_URL,
        pool_size=20,
        max_overflow=10,
        pool_recycle=3600,
        pool_pre_ping=True
    )

# Establish thread-safe Session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base model class for all SQLAlchemy entities
Base = declarative_base()

# Dependency injector to retrieve db session in FastAPI path operations
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
