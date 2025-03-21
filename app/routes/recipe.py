from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.session import SessionLocal
from app.schema.recipe import RecipeCreate, Recipe
from app.services.recipe_service import get_recipes, create_recipe, delete_recipe, update_recipe

router = APIRouter(
    prefix="/recipes",
    tags=["recipes"]
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=Recipe)
def create_new_recipe(recipe: RecipeCreate, db: Session = Depends(get_db)):
    return create_recipe(db=db, recipe=recipe)

@router.get("/", response_model=list[Recipe])
def list_recipes(username: str = None, db: Session = Depends(get_db)):
    return get_recipes(db=db, username=username)

@router.get("/{recipe_id}", response_model=Recipe)
def get_recipe_by_id(recipe_id: int, db: Session = Depends(get_db)):
    recipe = get_recipe(db=db, recipe_id=recipe_id)
    if not recipe:
        raise HTTPException(status_code=404, detail="Recipe not found")
    return recipe

@router.delete("/{recipe_id}")
def remove_recipe(recipe_id: int, db: Session = Depends(get_db)):
    if delete_recipe(db=db, recipe_id=recipe_id):
        return {"message": "Recipe deleted successfully"}
    raise HTTPException(status_code=404, detail="Recipe not found")