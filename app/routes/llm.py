from fastapi import APIRouter, Body, HTTPException
from dotenv import load_dotenv
from app.schema.llm import LLMRecipeResponse
from app.services.llm_service import generate_recipe

router = APIRouter(prefix="/ai", tags=["AI"])

load_dotenv()

@router.post("/generate_recipe", summary="Generate Recipe LLM", response_model=LLMRecipeResponse)
def generate_llm_recipe(data: dict = Body(...)):
    """
    Generate a recipe based on the provided prompt using an LLM.
    """
    prompt = data.get("prompt")
    if not prompt:
        raise HTTPException(status_code=400, detail="Prompt is required.")
    try:
        recipe = generate_recipe(prompt)
        return recipe
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))