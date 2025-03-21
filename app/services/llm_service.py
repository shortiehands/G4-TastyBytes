import openai
import os
import re
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

_base_url = "https://api.groq.com/openai/v1"
_model = "mixtral-8x7b-32768"
_api_key = os.getenv("GROQ_API_KEY")

client = openai.OpenAI(
    api_key=_api_key,
    base_url=_base_url
)

# print("Available Models:")
# for model in client.models.list():
#     print(f"- {model.id}")

def get_completion_for_messages(messages, model=_model):
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
    ingredients = ingredients_match.group(1).strip().split("\n- ") if ingredients_match else []
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
if __name__ == "__main__":
    prompt_text = "A gluten-free, dairy-free chocolate cake with no refined sugar"
    result = generate_recipe(prompt_text)
    print(result)