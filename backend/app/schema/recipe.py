from pydantic import BaseModel
from typing import Optional
from typing import List, Optional
from backend.app.models.review import ReviewResponse

class RecipeBase(BaseModel):
    title: str
    type: str
    ingredients: str
    steps: str
   
class RecipeCreate(RecipeBase):
    pass

class RecipeUpdate(RecipeBase):
    pass

class RecipeInDB(RecipeBase):
    id: int
    owner: str
    reviews: Optional[List[ReviewResponse]] = []

    class Config:
        from_attributes = True 
