from pydantic import BaseModel, validator

class ReviewBase(BaseModel):
    rating: int
    review: str

    @validator('rating')
    def validate_rating(cls, rating):
        if rating < 1 or rating > 5:
            raise ValueError('Rating must be between 1 and 5')
        return rating

class ReviewCreate(RecipeBase):
    pass

class ReviewResponse(RecipeBase):
    id: int

    class Config:
        from_attributes = True
