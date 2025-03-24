from fastapi import Depends
from sqlalchemy.orm import Session
from app.db.session import SessionLocal
from app.services.review_service import ReviewService

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_review_service(db: Session = Depends(get_db)) -> ReviewService:
    return ReviewService(db) 