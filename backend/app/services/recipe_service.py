from sqlalchemy.orm import Session
from backend.app.models.recipe import Recipe
from backend.app.schema.recipe import RecipeCreate

def get_recipes(db: Session, owner: str):
    return db.query(Recipe).filter(Recipe.owner == owner).all()

def get_recipe(db: Session, recipe_id: int, owner: str):
    return db.query(Recipe).filter(Recipe.id == recipe_id, Recipe.owner == owner).first()


def create_recipe(db: Session, recipe: RecipeCreate,owner: str):
    new_recipe = Recipe(title=recipe.title, type=recipe.type, ingredients=recipe.ingredients, steps=recipe.steps, owner=owner)
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

def get_user_uploaded_recipes(db: Session, ingredients: str):
     """
     Search for recipes from the internal DB that include any of the given ingredients.
     """
     terms = [term.strip().lower() for term in ingredients.split(",")]
     
     query = db.query(Recipe)
     for term in terms:
         query = query.filter(Recipe.ingredients.ilike(f"%{term}%"))
     
     return query.all()
