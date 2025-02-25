import openai
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

_base_url = "https://api.groq.com/openai/v1"
_model = "mixtral-8x7b-32768"
_api_key = os.getenv("GROQ_API_KEY")

client = openai.OpenAI(
    api_key=_api_key,
    base_url=_base_url,
)

# print("Available Models:")
# for model in client.models.list():
#     print(f"- {model.id}")

def get_completion_for_messages(messages, model=_model):
    response = client.chat.completions.create(
        messages=messages, model=model,
    )
    return response.choices[0].message.content

def create_messages(text):
    return [{
        "role": "system",
        "content": "You are a professional chef specializing in creating unique and delicious recipes. When given a dish description or a set of ingredients, provide a complete recipe that includes a creative 'Recipe Name', an overview, a list of ingredients, and detailed, step-by-step cooking instructions. Format your response with a 'Recipe Name:' section first, followed by an 'Overview:' section that summarizes the flavor profile, cooking techniques, and any unique elements of the dish, then an 'Ingredients:' section, and finally a 'Steps:' section with numbered instructions."
        },
        {
        "role": "user",
        "content": text
        }
    ]

def get_recipe(text):
    messages = create_messages(text)
    return get_completion_for_messages(messages)

# Example usage
if __name__ == "__main__":
    prompt_text = "A gluten-free, dairy-free chocolate cake with no refined sugar"
    result = get_recipe(prompt_text)
    print(result)