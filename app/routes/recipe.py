# app/routes/recipe.py
from fastapi import APIRouter, Depends, Query,HTTPException, status
from sqlalchemy.orm import Session
from typing import List
import httpx
from dotenv import load_dotenv
import os
from app.dependencies.get_username import get_username
from app.db.session import get_db  # This is the dependency that provides a DB session
from app.models.recipe import Recipe
from app.schema.recipe import RecipeCreate, RecipeUpdate, RecipeInDB

router = APIRouter(prefix="/recipes", tags=["recipes"])

load_dotenv()

API_KEY = os.getenv("SPOONACULAR_API_KEY")
BASE_URL = "https://api.spoonacular.com/recipes/findByIngredients"


@router.get("/search_recipes")
async def search_recipes(ingredients: str = Query(..., description="Comma-separated list of ingredients")):
    """
    Fetch recipes based on ingredients from Spoonacular API.
    """
    if not ingredients:
        raise HTTPException(status_code=400, detail="Please provide at least one ingredient.")

    params = {
        "ingredients": ingredients,
        "number": 10,
        "apiKey": API_KEY
    }

    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(BASE_URL, params=params)
            response.raise_for_status()
            return response.json()
        except httpx.RequestError as e:
            raise HTTPException(status_code=500, detail=f"Error fetching recipes: {str(e)}")
        
@router.get("/search_user_recipes")
def search_user_recipes(
    ingredients: str = Query(..., description="Comma-separated list of ingredients"),
    db: Session = Depends(get_db)
):
    """
    Search recipes uploaded by users in our database using ingredient terms.
    """
    if not ingredients:
        raise HTTPException(status_code=400, detail="No ingredients provided.")

    terms = [term.strip().lower() for term in ingredients.split(",")]
    
    query = db.query(Recipe)
    for term in terms:
        query = query.filter(Recipe.ingredients.ilike(f"%{term}%"))
    
    return query.all()
        
@router.get("/", response_model=List[RecipeInDB])
def read_recipes(
    username: str = Depends(get_username),
    db: Session = Depends(get_db),
):
    """
    Get all recipes created by the user.
    """
    recipes = db.query(Recipe).filter(Recipe.owner == username).all()
    return recipes

@router.post("/", response_model=RecipeInDB)
def create_recipe(
    recipe_in: RecipeCreate,
    username: str = Depends(get_username),
    db: Session = Depends(get_db),
):
    """
    Create a new recipe for the current user.
    """
    new_recipe = Recipe(
        title=recipe_in.title,
        type=recipe_in.type,
        ingredients=recipe_in.ingredients,
        steps=recipe_in.steps,
        owner=username,
    )
    db.add(new_recipe)
    db.commit()
    db.refresh(new_recipe)
    return new_recipe

@router.get("/{recipe_id}", response_model=RecipeInDB)
def read_recipe(
    recipe_id: int,
    username: str = Depends(get_username),
    db: Session = Depends(get_db),
):
    """
    Get a specific recipe if it belongs to the current user.
    """
    recipe = db.query(Recipe).filter(Recipe.id == recipe_id).first()
    if not recipe or recipe.owner != username:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Recipe not found"
        )
    return recipe

@router.put("/{recipe_id}", response_model=RecipeInDB)
def update_recipe(
    recipe_id: int,
    recipe_in: RecipeUpdate,
    username: str = Depends(get_username),
    db: Session = Depends(get_db),
):
    """
    Update a recipe if it belongs to the current user.
    """
    recipe = db.query(Recipe).filter(Recipe.id == recipe_id).first()
    if not recipe or recipe.owner != username:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Recipe not found or not yours"
        )

    recipe.title = recipe_in.title
    recipe.type = recipe_in.type
    recipe.ingredients = recipe_in.ingredients
    recipe.steps = recipe_in.steps

    db.commit()
    db.refresh(recipe)
    return recipe

@router.delete("/{recipe_id}")
def delete_recipe(
    recipe_id: int,
    username: str = Depends(get_username),
    db: Session = Depends(get_db),
):
    """
    Delete a recipe if it belongs to the current user.
    """
    recipe = db.query(Recipe).filter(Recipe.id == recipe_id).first()
    if not recipe or recipe.owner != username:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Recipe not found or not yours"
        )
    db.delete(recipe)
    db.commit()
    return {"detail": "Recipe deleted"}