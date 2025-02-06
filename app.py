import requests
from flask import Flask, request, jsonify, render_template

app = Flask(__name__) #creates class for app

API_KEY = "bfc95f65167e4a7e83366e9fc517e55f"  # Replace with your Spoonacular API key
BASE_URL = "https://api.spoonacular.com/recipes/findByIngredients"


@app.route('/')
def index():
    return render_template('index.html')  

@app.route('/find_recipes', methods=['POST'])
def find_recipes():
    data = request.json
    ingredients = data.get('ingredients', '')

    if not ingredients.strip():
        return jsonify({"error": "Please provide ingredients."}), 400

    try:
        response = requests.get(
            BASE_URL,
            params={
                "ingredients": ingredients,
                "number": 10,
                "apiKey": API_KEY
            }
        )
        response.raise_for_status()
        recipes = response.json()
        return jsonify(recipes)
    except requests.exceptions.RequestException as e:
        return jsonify({"error": "Failed to fetch recipes.", "details": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
