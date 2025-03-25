from pydantic import BaseModel, field_validator

class ReviewBase(BaseModel):
    rating: int
    review: str
    created_at: str

    @field_validator('rating')
    def validate_rating(cls, rating):
        if rating < 1 or rating > 5:
            raise ValueError('Rating must be between 1 and 5')
        return rating

class ReviewCreate(ReviewBase):
    pass

class RecipeUpdate(ReviewBase):
    pass

class ReviewResponse(ReviewBase):
    id: int

    class Config:
        from_attributes = True