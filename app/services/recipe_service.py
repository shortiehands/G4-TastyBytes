from sqlalchemy.orm import Session
from app.models.recipe import Recipe
from app.schema.recipe import RecipeCreate
from sqlalchemy.orm import joinedload

def get_recipes(db: Session, username: str = None):
    query = db.query(Recipe).options(joinedload(Recipe.reviews))
    if username:
        return query.filter(Recipe.username == username).all()
    return query.all()

def get_recipe(db: Session, recipe_id: int):
    return db.query(Recipe).options(joinedload(Recipe.reviews)).filter(Recipe.id == recipe_id).first()

def create_recipe(db: Session, recipe: RecipeCreate):
    db_recipe = Recipe(**recipe.model_dump())
    db.add(db_recipe)
    db.commit()
    db.refresh(db_recipe)
    return db_recipe

def update_recipe(db: Session, recipe_id: int, recipe_data: dict):
    recipe = db.query(Recipe).filter(Recipe.id == recipe_id).first()
    if recipe:
        for key, value in recipe_data.items():
            setattr(recipe, key, value)
        db.commit()
        db.refresh(recipe)
    return recipe

def delete_recipe(db: Session, recipe_id: int):
    recipe = db.query(Recipe).filter(Recipe.id == recipe_id).first()
    if recipe:
        db.delete(recipe)
        db.commit()
        return True
    return False
