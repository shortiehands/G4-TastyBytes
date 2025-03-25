from pydantic import BaseModel

class LLMRecipeResponse(BaseModel):
    recipe_name: str
    overview: str
    ingredients: list
    steps: list