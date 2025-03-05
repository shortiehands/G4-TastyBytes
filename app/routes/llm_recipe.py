from fastapi import APIRouter, Body, HTTPException
from pydantic import BaseModel
from app.services.llm_service import generate_recipe

router = APIRouter(prefix="/generate-recipe-AI", tags=["generate-recipe-AI"])

class RecipePrompt(BaseModel):
    prompt: str

@router.post("/", summary="Generate recipe using LLM")
async def generate_llm_recipe(prompt: RecipePrompt = Body(...)):
    """
    Generate a recipe based on the provided prompt using an LLM.
    """
    if not prompt.prompt:
        raise HTTPException(status_code=400, detail="Prompt is required.")
    try:
        recipe = generate_recipe(prompt.prompt)
        return {"recipe": recipe}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))