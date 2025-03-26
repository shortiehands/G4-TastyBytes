# Tasty Bytes - a simple recipe search app

Steps to run Frontend UI in localhost

1. Navigate to frontend folder: cd frontend

2. Install dependencies: npm install

3. Start the development server: npm start

# Troubleshooting (if necessary):
    - If you encounter issues, try (at your own risk, got this from ChatGPT):
        rm -rf node_modules package-lock.json && npm install
    - Ensure Node.js and npm are installed (check with `node -v` and `npm -v`)

Steps to run Backend in localhost

1. Create and activate a virtual environment:
    - bash
    - python -m venv venv
    - source venv/bin/activate   # On Windows Command Prompt (not Power Shell), use venv\Scripts\activate

2. Install Dependencies:: pip install -r requirements.txt # Install project dependencies using the `requirements.txt` file

3. Run the Fast API server: uvicorn app.main:app --reload