from pydantic import BaseModel

class RecipeBase(BaseModel):
    title: str
    description: str
    ingredients: str
    steps: str

class RecipeCreate(RecipeBase):
    pass

class RecipeResponse(RecipeBase):
    id: int

    class Config:
        from_attributes = True
