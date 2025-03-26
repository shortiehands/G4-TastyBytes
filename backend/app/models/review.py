from sqlalchemy import Column, Integer, String, ForeignKey, UniqueConstraint
from sqlalchemy.orm import relationship
from pydantic import BaseModel
from backend.app.db.session import Base

class Review(Base):
    __tablename__ = "reviews"
    
    id = Column(Integer, primary_key=True, index=True)
    review = Column(String, nullable=False)
    rating = Column(Integer, nullable=False)
    username = Column(String, nullable=False)
    recipe_id = Column(Integer, ForeignKey("recipes.id"), nullable=False)
    
    recipe = relationship("Recipe", back_populates="reviews")
    
    # Ensure one review per user per recipe
    __table_args__ = (
        UniqueConstraint('username', 'recipe_id', name='uix_user_recipe'),
    )

class ReviewInfo(BaseModel):
    review: str
    rating: int
    username: str

class ReviewResponse(BaseModel):
    id: int
    review: str
    rating: int
    username: str
    recipe_id: int
    
    class Config:
        from_attributes = True