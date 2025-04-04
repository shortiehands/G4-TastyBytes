import openai
import os
import re
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

_base_url = "https://api.groq.com/openai/v1"
_model = "llama3-70b-8192"
_api_key = os.getenv("OPENAI_API_KEY")

def get_openai_client():
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        raise ValueError("OpenAI API key not found. Ensure it is set in the .env file.")

    return openai.OpenAI(
        api_key=api_key,
        base_url=_base_url,
    )

# print("Available Models:")
# for model in client.models.list():
#     print(f"- {model.id}")

def get_completion_for_messages(messages, model=_model):
    client = get_openai_client()
    try:
        response = client.chat.completions.create(
        messages=messages, model=model,
    )
        return response.choices[0].message.content
    except openai.OpenAIError as e:
        print(f"API Error: {e}")
        return {"error": "Failed to fetch response"}
    except Exception as e:
        print(f"Unexpected Error: {e}")
        return {"error": "Unexpected server error"}

def create_messages(text):
    return [{
        "role": "system",
        "content": "You are a professional chef specializing in creating unique and delicious recipes. When given a dish description or a set of ingredients, provide a complete recipe that includes a creative recipe name, a concise overview, a list of ingredients, and detailed, step-by-step cooking instructions. Format your response with a 'Recipe Name:' section first, followed by an 'Overview:' section that summarizes the flavor profile, cooking techniques, and any unique elements of the dish, then an 'Ingredients:' section, and finally a 'Steps:' section with numbered instructions."
        },
        {
        "role": "user",
        "content": text
        }
    ]

def post_process(response_text: str):
    """
    Extracts the recipe name, overview, ingredients, and steps from the response text.
    """
    # Define regex patterns for extracting sections
    recipe_name_pattern = r"(?:\*\*Recipe Name:\*\*|Recipe Name:)\s*(.*)"
    overview_pattern = r"(?:\*\*Overview:\*\*|Overview:)\s*(.*?)\s*(?:\*\*Ingredients:\*\*|Ingredients:)"
    ingredients_pattern = r"(?:\*\*Ingredients:\*\*|Ingredients:)\s*\n?(.*?)(?:\s*(?:\*\*Steps:\*\*|Steps:))"
    steps_pattern = r"(?:\*\*Steps:\*\*|Steps:)\s*\n?(.*)"

    # Extract sections using regex
    recipe_name_match = re.search(recipe_name_pattern, response_text)
    overview_match = re.search(overview_pattern, response_text, re.DOTALL)
    ingredients_match = re.search(ingredients_pattern, response_text, re.DOTALL)
    steps_match = re.search(steps_pattern, response_text, re.DOTALL)

    # Process extracted data
    recipe_name = recipe_name_match.group(1).strip() if recipe_name_match else "Unknown"
    overview = overview_match.group(1).strip() if overview_match else "No overview available"

    # Clean and structure ingredients (preserve subsections like "For the cake:")
    ingredients_raw = ingredients_match.group(1).strip() if ingredients_match else ""
    ingredient_lines = re.split(r"\n(?=\*|For\s)", ingredients_raw)
    ingredients = [line.strip() for line in ingredient_lines if line.strip()]

    steps = steps_match.group(1).strip().split("\n") if steps_match else []

    return {
        "recipe_name": recipe_name,
        "overview": overview,
        "ingredients": ingredients,
        "steps": steps
    }

def generate_recipe(text):
    messages = create_messages(text)
    response = get_completion_for_messages(messages)
    return post_process(response)
    # return get_completion_for_messages(messages)

# Example usage
# if __name__ == "__main__":
#     prompt_text = "A gluten-free, dairy-free chocolate cake with no refined sugar"
#     result = generate_recipe(prompt_text)