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
        "content": "You are a professional chef specializing in creating unique and delicious recipes. When given a dish description or a set of ingredients, provide a complete recipe that includes an overview, a list of ingredients and detailed, step-by-step cooking instructions. Format your response with an 'Overview:' section first, followed by an 'Ingredients:' section with the list of ingredients, and a 'Steps:' section with numbered instructions."
        },
        {
        "role": "user",
        "content": text
        }
    ]

# Example usage
if __name__ == "__main__":
    prompt_text = "A gluten-free, dairy-free chocolate cake with no refined sugar"
    messages = create_messages(prompt_text)
    result = get_completion_for_messages(messages)
    print(result)