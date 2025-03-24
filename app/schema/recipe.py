from pydantic import BaseModel
from typing import Optional

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

    class Config:
        from_attributes = True 
