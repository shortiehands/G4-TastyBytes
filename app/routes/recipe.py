# app/routes/recipe.py
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.dependencies.get_username import get_username
from app.db.session import get_db  # This is the dependency that provides a DB session
from app.models.recipe import Recipe
from app.schema.recipe import RecipeCreate, RecipeUpdate, RecipeInDB

router = APIRouter(prefix="/recipes", tags=["recipes"])

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