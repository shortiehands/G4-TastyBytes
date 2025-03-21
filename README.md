# TastyBytes Recipe API

A FastAPI-based recipe sharing application with review functionality.

## Getting Started

### Prerequisites
- Python 3.8+
- pip (Python package installer)

### Installation
1. Clone the repository
2. Create a virtual environment:
   ```bash
   python -m venv msenv
   source msenv/bin/activate  # On Windows: msenv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

## Running the Application

1. Start the FastAPI server:
   ```bash
   uvicorn app.main:app --reload --port 8000
   ```
2. The API will be available at:
   - API: http://localhost:8000
   - Swagger UI: http://localhost:8000/docs
   - ReDoc: http://localhost:8000/redoc

## Testing with Swagger UI

### 1. Create a Recipe
- Endpoint: POST /recipes/
- Sample payload:
  ```json
  {
    "title": "Classic Tiramisu",
    "description": "Italian coffee-flavored dessert",
    "ingredients": [
      "6 egg yolks",
      "1 cup sugar",
      "1 pound mascarpone cheese",
      "2 cups strong coffee"
    ],
    "steps": [
      "Make coffee and let it cool",
      "Mix egg yolks and sugar",
      "Add mascarpone"
    ],
    "username": "chef_mario"
  }
  ```
- Note the `recipe_id` from the response

### 2. Test Review Endpoints

#### Create a Review
- Endpoint: POST /recipes/{recipe_id}/reviews
- Sample payload:
  ```json
  {
    "review": "Excellent recipe! Very authentic taste.",
    "username": "foodie123"
  }
  ```

#### Get All Reviews for a Recipe
- Endpoint: GET /recipes/{recipe_id}/reviews

#### Get Specific User's Review
- Endpoint: GET /recipes/{recipe_id}/reviews/{username}

#### Update a Review
- Endpoint: PUT /recipes/{recipe_id}/reviews/{username}
- Sample payload:
  ```json
  {
    "review": "Updated: Even better after trying it again!",
    "username": "foodie123"
  }
  ```

#### Delete a Review
- Endpoint: DELETE /recipes/{recipe_id}/reviews/{username}

## Running Unit Tests

### Setup Testing Environment

1. Install testing dependencies:
   ```bash
   pip install pytest pytest-asyncio httpx
   ```

2. Directory structure:
   ```
   tests/
   ├── __init__.py
   ├── conftest.py           # Pytest fixtures
   ├── test_recipes.py       # Recipe tests
   ├── test_reviews.py       # Review tests
   └── test_models.py        # Model tests
   ```

### Running Tests

1. Run all tests:
   ```bash
   pytest
   ```

2. Run specific test file:
   ```bash
   pytest tests/test_reviews.py
   ```

3. Run with verbose output:
   ```bash
   pytest -v
   ```

4. Run with print statements:
   ```bash
   pytest -s
   ```

5. Run with coverage:
   ```bash
   pytest --cov=app tests/
   ```

### Key Test Scenarios

#### Review Tests
- Creating a review
- Enforcing one review per user per recipe
- Retrieving reviews for a recipe
- Getting specific user's review
- Updating reviews
- Deleting reviews
- Error cases:
  - Invalid recipe_id
  - Invalid username
  - Duplicate reviews
  - Missing required fields

## Database Schema

### Recipe Model
- id: Integer (Primary Key)
- title: String
- description: String
- ingredients: List[String]
- steps: List[String]
- username: String

### Review Model
- id: Integer (Primary Key)
- review: String
- username: String
- recipe_id: Integer (Foreign Key)
- Unique constraint: (username, recipe_id)

## API Features

- Create and manage recipes
- One review per user per recipe
- View all reviews for a recipe
- Update and delete own reviews
- User-specific review retrieval

## Contributing

1. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
2. Make your changes
3. Run tests
4. Submit a pull request