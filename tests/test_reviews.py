import pytest
from app.models.review import Review, ReviewInfo
from app.models.recipe import Recipe

def test_get_reviews_empty(review_service):
    """Test getting reviews for a recipe when there are no reviews"""
    reviews = review_service.get_review_by_recipe_id(1)
    assert reviews == []

def test_create_review(db_session, review_service):
    """Test creating a new review for an existing recipe"""
    # First create a recipe
    recipe = Recipe(id=1, title="Test Recipe", description="Test Description")
    db_session.add(recipe)
    db_session.commit()

    # Create review
    review_data = ReviewInfo(review="This is a test review", username="testuser")
    new_review = review_service.add_review(recipe_id=1, review_data=review_data)
    assert new_review is not None
    assert new_review.review == "This is a test review"
    assert new_review.username == "testuser"

def test_create_review_nonexistent_recipe(review_service):
    """Test creating a review for a non-existent recipe"""
    review_data = ReviewInfo(review="This is a test review", username="testuser")
    new_review = review_service.add_review(recipe_id=999, review_data=review_data)
    assert new_review is None

def test_get_reviews(db_session, review_service):
    """Test getting reviews for a recipe"""
    # Create recipe
    recipe = Recipe(id=1, title="Test Recipe", description="Test Description")
    db_session.add(recipe)

    # Add two reviews
    review1 = Review(review="First review", recipe_id=1, username="user1")
    review2 = Review(review="Second review", recipe_id=1, username="user2")
    db_session.add(review1)
    db_session.add(review2)
    db_session.commit()

    # Get reviews
    reviews = review_service.get_review_by_recipe_id(recipe_id=1)
    assert len(reviews) == 2
    assert reviews[0].review in ["First review", "Second review"]
    assert reviews[1].review in ["First review", "Second review"]

def test_update_review(db_session, review_service):
    """Test updating an existing review"""
    # Create recipe and review
    recipe = Recipe(id=1, title="Test Recipe", description="Test Description")
    db_session.add(recipe)
    review = Review(id=1, review="Original review", recipe_id=1, username="testuser")
    db_session.add(review)
    db_session.commit()

    # Update review
    updated_data = ReviewInfo(review="Updated review", username="testuser")
    updated_review = review_service.update_review(recipe_id=1, username="testuser", new_review_data=updated_data)
    assert updated_review is not None
    assert updated_review.review == "Updated review"

def test_update_nonexistent_review(review_service):
    """Test updating a non-existent review"""
    updated_data = ReviewInfo(review="Updated review", username="testuser")
    updated_review = review_service.update_review(recipe_id=1, username="nonexistent", new_review_data=updated_data)
    assert updated_review is None

def test_delete_review(db_session, review_service):
    """Test deleting a review"""
    # Create recipe and review
    recipe = Recipe(id=1, title="Test Recipe", description="Test Description")
    db_session.add(recipe)
    review = Review(id=1, review="Review to delete", recipe_id=1, username="testuser")
    db_session.add(review)
    db_session.commit()

    # Delete review
    success = review_service.delete_review(recipe_id=1, username="testuser")
    assert success is True

    # Verify review is deleted
    reviews = review_service.get_review_by_recipe_id(recipe_id=1)
    assert len(reviews) == 0

def test_delete_nonexistent_review(review_service):
    """Test deleting a non-existent review"""
    success = review_service.delete_review(recipe_id=1, username="nonexistent")
    assert success is False 