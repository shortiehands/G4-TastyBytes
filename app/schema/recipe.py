from pydantic import BaseModel
from typing import List, Optional
from app.models.review import ReviewResponse

class RecipeBase(BaseModel):
    title: str
    description: str
    ingredients: str
    steps: str
    owner: str

class RecipeCreate(RecipeBase):
    pass

class Recipe(RecipeBase):
    id: int
    reviews: Optional[List[ReviewResponse]] = []

    class Config:
        from_attributes = True 
