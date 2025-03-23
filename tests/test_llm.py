import pytest
import os
from app.services.llm_service import post_process, generate_recipe

openai_api_key = os.getenv("OPENAI_API_KEY")
if not openai_api_key:
    raise ValueError("OpenAI API key not found. Ensure it is set in the .env file.")

@pytest.fixture
def mock_llm_response():
    return (
        "Recipe Name: Decadent Guilt-Free Chocolate Delight\n\n"
        "Overview:\n"
        "This cake is gluten-free, dairy-free, and free from refined sugar...\n\n"
        "Ingredients:\n"
        "For the cake:\n"
        "- 2 cups almond flour\n"
        "- 1/2 cup cocoa powder\n"
        "\n"
        "For the frosting:\n"
        "- 1 cup coconut cream\n"
        "- 1/2 cup dark chocolate chips\n\n"
        "Steps:\n"
        "1. Preheat the oven to 350°F.\n"
        "2. Mix the dry ingredients.\n"
        "3. Add wet ingredients and bake."
    )

def test_post_process_structure(mock_llm_response):
    result = post_process(mock_llm_response)

    assert isinstance(result, dict)
    assert "recipe_name" in result
    assert "overview" in result
    assert "ingredients" in result
    assert "steps" in result

    assert result["recipe_name"] == "Decadent Guilt-Free Chocolate Delight"
    assert result["overview"].lower().startswith("this cake")
    assert any("almond flour" in i.lower() for i in result["ingredients"])
    assert len(result["steps"]) >= 3

def test_generate_recipe_with_mock(mocker, mock_llm_response):
    # Patch the LLM call to return mock response instead of real API
    mocker.patch("app.services.llm_service.get_completion_for_messages", return_value=mock_llm_response)

    prompt = "A healthy chocolate cake with no dairy or refined sugar"
    result = generate_recipe(prompt)

    assert result["recipe_name"] == "Decadent Guilt-Free Chocolate Delight"
    assert "cake" in result["overview"].lower()
    assert len(result["ingredients"]) > 0
    assert len(result["steps"]) > 0

# Edge case testing for missing or malformed sections
@pytest.mark.parametrize("response_text, expected", [
    # Missing Recipe Name
    (
        "Overview:\nThis is tasty.\n\nIngredients:\n- 1 cup sugar\n\nSteps:\n1. Mix it.",
        {"recipe_name": "Unknown", "has_ingredients": True, "has_steps": True}
    ),
    # Missing Overview
    (
        "Recipe Name: Mystery Dish\n\nIngredients:\n- 1 egg\n\nSteps:\n1. Boil the egg.",
        {"recipe_name": "Mystery Dish", "overview": "No overview available"}
    ),
    # Missing Ingredients
    (
        "Recipe Name: Air Delight\n\nOverview:\nJust a joke.\n\nSteps:\n1. Breathe in.",
        {"ingredients": []}
    ),
    # Missing Steps
    (
        "Recipe Name: Lazy Lunch\n\nOverview:\nOpen a packet.\n\nIngredients:\n- 1 packet chips",
        {"steps": []}
    ),
    # Completely broken response
    (
        "Blah blah nothing usable here",
        {
            "recipe_name": "Unknown",
            "overview": "No overview available",
            "ingredients": [],
            "steps": []
        }
    )
])

def test_post_process_with_partial_response(response_text, expected):
    result = post_process(response_text)

    if "recipe_name" in expected:
        assert result["recipe_name"] == expected["recipe_name"]
    if "overview" in expected:
        assert result["overview"] == expected["overview"]
    if "has_ingredients" in expected:
        assert isinstance(result["ingredients"], list) and len(result["ingredients"]) > 0
    if "has_steps" in expected:
        assert isinstance(result["steps"], list) and len(result["steps"]) > 0
    if "ingredients" in expected:
        assert result["ingredients"] == expected["ingredients"]
    if "steps" in expected:
        assert result["steps"] == expected["steps"]