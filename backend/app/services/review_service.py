from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from backend.app.models.review import Review, ReviewInfo
from backend.app.models.recipe import Recipe
from fastapi import HTTPException, status

class ReviewService:
    def __init__(self, db: Session):
        self.db = db

    def get_review_by_recipe_id(self, recipe_id: int):
        return self.db.query(Review).filter(Review.recipe_id == recipe_id).all()
    
    def get_user_review(self, recipe_id: int, username: str):
        return self.db.query(Review).filter(
            Review.recipe_id == recipe_id,
            Review.username == username
        ).first()
    
    def add_review(self, recipe_id: int, review_data: ReviewInfo):
        # Check if the recipe exists
        recipe = self.db.query(Recipe).filter(Recipe.id == recipe_id).first()
        if not recipe:
            return None
            
        try:
            # Add the review
            new_review = Review(
                recipe_id=recipe_id,
                review=review_data.review,
                rating=review_data.rating,
                username=review_data.username
            )
            self.db.add(new_review)
            self.db.commit()
            self.db.refresh(new_review)
            return new_review
        except IntegrityError:
            self.db.rollback()
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="You have already reviewed this recipe"
            )
    
    def update_review(self, recipe_id: int, username: str, new_review_data: ReviewInfo):
        # Check if the recipe exists
        recipe = self.db.query(Recipe).filter(Recipe.id == recipe_id).first()
        if not recipe:
            return None
            
        # Update the review
        review = self.db.query(Review).filter(
            Review.recipe_id == recipe_id,
            Review.username == username
        ).first()
        
        if not review:
            return None
            
        if review.username != new_review_data.username:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You can only update your own reviews"
            )
            
        review.review = new_review_data.review
        self.db.commit()
        return review
    
    def delete_review(self, recipe_id: int, username: str):
        review = self.db.query(Review).filter(
            Review.recipe_id == recipe_id,
            Review.username == username
        ).first()
        
        if not review:
            return False
            
        self.db.delete(review)
        self.db.commit()
        return True