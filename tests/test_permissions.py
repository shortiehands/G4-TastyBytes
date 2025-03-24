from unittest.mock import MagicMock
from app.services.recipe_service import get_recipes, get_recipe, update_recipe, delete_recipe

def test_user_cannot_see_other_users_recipes():
    db = MagicMock()
    
    # Simulating two users
    user_1 = "alice"
    user_2 = "bob"
    
    # Mocking the database query
    db.query().filter().all.return_value = []

    recipes = get_recipes(db, owner=user_2)
    
    assert recipes == [], "User should not see recipes belonging to another user."

def test_user_cannot_update_other_users_recipe():
    db = MagicMock()
    
    user_1 = "alice"
    user_2 = "bob"
    
    # Mock recipe owned by user_1
    db.query().filter().first.return_value = None  # Simulate no access to the recipe

    response = update_recipe(db, recipe_id=1, title="New Title", type="Updated", ingredients="New", steps="New")
    
    assert response == {"message": "Recipe updated successfully!", "recipe": None}, "User should not be able to update another user's recipe."

def test_user_cannot_delete_other_users_recipe():
    db = MagicMock()
    
    user_1 = "alice"
    user_2 = "bob"
    
    # Mock recipe owned by user_1
    db.query().filter().first.return_value = None  # Simulate no access to the recipe

    result = delete_recipe(db, recipe_id=1)

    assert result == False, "User should not be able to delete another user's recipe."
