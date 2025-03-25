from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from backend.app.db.session import SessionLocal
from backend.app.models.review import ReviewInfo
from backend.app.services.review_service import ReviewService

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/recipes/{recipe_id}/reviews")
def get_reviews(recipe_id: int, db: Session = Depends(get_db)):
    review_service = ReviewService(db)
    reviews = review_service.get_review_by_recipe_id(recipe_id)
    if not reviews:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No reviews found for this recipe"
        )
    return reviews

@router.get("/recipes/{recipe_id}/reviews/{username}")
def get_user_review(recipe_id: int, username: str, db: Session = Depends(get_db)):
    review_service = ReviewService(db)
    review = review_service.get_user_review(recipe_id, username)
    if not review:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Review not found"
        )
    return review

@router.post("/recipes/{recipe_id}/reviews")
def add_review(recipe_id: int, review: ReviewInfo, db: Session = Depends(get_db)):
    review_service = ReviewService(db)
    new_review = review_service.add_review(recipe_id, review)
    if not new_review:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Recipe not found"
        )
    return new_review

@router.put("/recipes/{recipe_id}/reviews/{username}")
def update_review(recipe_id: int, username: str, review: ReviewInfo, db: Session = Depends(get_db)):
    review_service = ReviewService(db)
    updated_review = review_service.update_review(recipe_id, username, review)
    if not updated_review:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Review not found"
        )
    return updated_review

@router.delete("/recipes/{recipe_id}/reviews/{username}")
def delete_review(recipe_id: int, username: str, db: Session = Depends(get_db)):
    review_service = ReviewService(db)
    if not review_service.delete_review(recipe_id, username):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Review not found"
        )
    return {"message": "Review deleted successfully"}