from sqlalchemy.orm import Session
from app.models.recipe import Recipe
from app.schema.recipe import RecipeCreate

def get_recipes(db: Session):
    return db.query(Recipe).all()

def get_recipe(db: Session, recipe_id: int):
    return db.query(Recipe).filter(Recipe.id == recipe_id).first()

def create_recipe(db: Session, recipe: RecipeCreate):
    new_recipe = Recipe(title=recipe.title, description=recipe.description, ingredients=recipe.ingredients, steps=recipe.steps)
    db.add(new_recipe)
    db.commit()
    db.refresh(new_recipe)
    return new_recipe

def delete_recipe(db: Session, recipe_id: int):
    recipe = db.query(Recipe).filter(Recipe.id == recipe_id).first()
    if recipe:
        db.delete(recipe)
        db.commit()
        return True
    return False



def update_recipe(db: Session, recipe_id: int, title: str, description: str, ingredients: str, steps: str):
    recipe = db.query(Recipe).filter(Recipe.id == recipe_id).first()
    if recipe:
        recipe.title = title
        recipe.description = description
        recipe.ingredients = ingredients
        recipe.steps = steps
        db.commit()
        db.refresh(recipe)  # Ensures the returned recipe has updated values

    return {"message": "Recipe updated successfully!", "recipe": recipe}
