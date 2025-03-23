#Test cases for the CRUD operations of the recipe service

from unittest.mock import MagicMock
from app.schema.recipe import RecipeCreate
from app.services.recipe_service import create_recipe
from app.services.recipe_service import get_recipes
from app.services.recipe_service import get_recipe
from app.services.recipe_service import delete_recipe
from app.services.recipe_service import update_recipe
from app.models.recipe import Recipe


def test_create_recipe():
    # Mock DB session
    mock_db = MagicMock()

    # Example recipe data
    recipe_data = Recipe(
        title="Test Recipe",
        type="Delicious test dish",
        ingredients="Flour, Sugar, Eggs",
        steps="Mix and bake",
       
    )

    # Call function
    new_recipe = create_recipe(mock_db, recipe_data,"test_owner")

    # Assertions
    assert new_recipe.title == "Test Recipe"
    assert new_recipe.type == "Delicious test dish"
    assert new_recipe.ingredients == "Flour, Sugar, Eggs"
    assert new_recipe.steps == "Mix and bake"
    assert new_recipe.owner == "test_owner"  

    # Check if the database functions were called
    mock_db.add.assert_called_once()
    mock_db.commit.assert_called_once()
    mock_db.refresh.assert_called_once_with(new_recipe)


def test_get_recipes():
    mock_db = MagicMock()
    mock_db.query().filter().all.return_value = [
        Recipe(id=1, title="Recipe 1", owner="test_user"),
        Recipe(id=2, title="Recipe 2", owner="test_user")
    ]

    recipes = get_recipes(mock_db, "test_user")

    assert len(recipes) == 2
    assert recipes[0]["title"] == "Recipe 1"
    assert recipes[1]["title"] == "Recipe 2"



def test_get_recipe():
    mock_db = MagicMock()
    mock_db.query().filter().first.return_value = Recipe(
    id=1, title="Test Recipe", owner="test_user")
    

    recipe = get_recipe(mock_db, 1, "test_user")

    assert recipe["title"] == "Test Recipe"

def test_delete_recipe():
    mock_db = MagicMock()
    mock_db.query().filter().first.return_value = {"id": 1, "title": "Test Recipe"}

    result = delete_recipe(mock_db, 1)

    assert result is True
    mock_db.delete.assert_called_once()
    mock_db.commit.assert_called_once()

def test_update_recipe():
    mock_db = MagicMock()
    mock_recipe =  Recipe(
    id=1, title="Old Title", type="Old Description",
    ingredients="Old Ingredients", steps="Old Steps", owner="test_user")
    
    mock_db.query().filter().first.return_value = mock_recipe

    result = update_recipe(
        mock_db, 1, 
        "New Title", "New Description", "New Ingredients", "New Steps"
    )

    assert result["message"] == "Recipe updated successfully!"
    assert result["recipe"]["title"] == "New Title"
    assert result["recipe"]["type"] == "New Description"

