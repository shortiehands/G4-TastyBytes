import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from backend.app.models.recipe import Recipe, Base
from backend.app.services.recipe_service import (
    get_recipes, get_recipe, create_recipe, update_recipe, delete_recipe, get_user_uploaded_recipes
)
from backend.app.schema.recipe import RecipeCreate
from fastapi import FastAPI
from fastapi.testclient import TestClient

# Create an in-memory SQLite database for testing
SQLALCHEMY_DATABASE_URL = "sqlite:///:memory:"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

@pytest.fixture
def db_session():
    """Fixture to create a new database session for each test."""
    Base.metadata.create_all(bind=engine)  # Create tables
    db = TestingSessionLocal()
    try:
        yield db  # Provide the session to the test
    finally:
        db.close()
        Base.metadata.drop_all(bind=engine)  # Clean up after test

@pytest.fixture
def sample_recipe():
    """Fixture to provide a sample recipe object."""
    return RecipeCreate(
        title="Spaghetti Carbonara",
        type="Italian",
        ingredients="Spaghetti, eggs, pancetta, parmesan, black pepper",
        steps="Boil pasta, cook pancetta, mix with eggs and cheese"
    )

def test_create_recipe(db_session, sample_recipe):
    """Test creating a new recipe."""
    username = "test_user"
    recipe = create_recipe(db_session, sample_recipe, username)
    assert recipe.id is not None
    assert recipe.title == sample_recipe.title
    assert recipe.owner == username

def test_get_recipes(db_session, sample_recipe):
    """Test retrieving all recipes for a user."""
    username = "test_user"
    create_recipe(db_session, sample_recipe, username)
    recipes = get_recipes(db_session, username)
    assert len(recipes) == 1
    assert recipes[0].title == sample_recipe.title

def test_get_recipe(db_session, sample_recipe):
    """Test retrieving a single recipe by ID."""
    username = "test_user"
    created_recipe = create_recipe(db_session, sample_recipe, username)
    retrieved_recipe = get_recipe(db_session, created_recipe.id, username)
    assert retrieved_recipe is not None
    assert retrieved_recipe.title == sample_recipe.title

def test_update_recipe(db_session, sample_recipe):
    """Test updating a recipe."""
    username = "test_user"
    created_recipe = create_recipe(db_session, sample_recipe, username)
    updated_title = "Updated Carbonara"
    updated_description = "New instructions"
    updated_recipe = update_recipe(
        db_session, created_recipe.id, updated_title, updated_description, sample_recipe.ingredients, sample_recipe.steps
    )
    assert updated_recipe["recipe"].title == updated_title

def test_delete_recipe(db_session, sample_recipe):
    """Test deleting a recipe."""
    username = "test_user"
    created_recipe = create_recipe(db_session, sample_recipe, username)
    assert delete_recipe(db_session, created_recipe.id) is True
    assert get_recipe(db_session, created_recipe.id, username) is None

def test_search_user_recipes(db_session):
    """Test searching user recipes by ingredient keywords."""

    # Add recipes using existing service method
    recipes = [
        RecipeCreate(
            title="Spaghetti Carbonara",
            type="Italian",
            ingredients="Spaghetti, eggs, pancetta, parmesan, black pepper",
            steps="Boil pasta, cook pancetta, mix with eggs and cheese"
        ),
        RecipeCreate(
            title="Tomato Basil Pasta",
            type="Italian",
            ingredients="Pasta, tomato, basil, olive oil, garlic",
            steps="Cook pasta, make sauce with tomato and basil"
        ),
        RecipeCreate(
            title="Chicken Stir Fry",
            type="Asian",
            ingredients="Chicken, bell pepper, soy sauce, garlic, onion",
            steps="Stir fry chicken and vegetables in soy sauce"
        )
    ]

    for recipe in recipes:
        create_recipe(db_session, recipe, "test_user")
    db_session.commit()

    # Test: single ingredient
    results = get_user_uploaded_recipes(db_session, "garlic")
    assert len(results) == 2
    assert any("Tomato Basil Pasta" in r.title for r in results)
    assert any("Chicken Stir Fry" in r.title for r in results)

    # Test: multiple ingredients
    results = get_user_uploaded_recipes(db_session, "pancetta,parmesan")
    assert len(results) == 1
    assert results[0].title == "Spaghetti Carbonara"

    # Test: no matches
    results = get_user_uploaded_recipes(db_session, "chocolate")
    assert results == []