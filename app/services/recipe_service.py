from sqlalchemy.orm import Session
from app.models.recipe import Recipe
from app.schema.recipe import RecipeCreate
from sqlalchemy.orm import joinedload

def get_recipes(db: Session, owner: str):
    return db.query(Recipe).filter(Recipe.owner == owner).all()

def get_recipe(db: Session, recipe_id: int, owner: str):
    return db.query(Recipe).filter(Recipe.id == recipe_id, Recipe.owner == owner).first()


def create_recipe(db: Session, recipe: RecipeCreate,owner: str):
    new_recipe = Recipe(title=recipe.title, type=recipe.type, ingredients=recipe.ingredients, steps=recipe.steps, owner=owner)
    db.add(new_recipe)
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



def update_recipe(db: Session, recipe_id: int, title: str, type: str, ingredients: str, steps: str):
    recipe = db.query(Recipe).filter(Recipe.id == recipe_id).first()
    if recipe:
        recipe.title = title
        recipe.type = type
        recipe.ingredients = ingredients
        recipe.steps = steps
        db.commit()
        db.refresh(recipe)  # Ensures the returned recipe has updated values

    return {"message": "Recipe updated successfully!", "recipe": recipe}
