### Set Up a Virtual Environment:
   Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate   # On Windows Command Prompt (not Power Shell), use venv\Scripts\activate
   ```

### Install Dependencies:
   Install project dependencies using the `requirements.txt` file:
   ```bash
   pip install -r requirements.txt
   ```

### Run the Fast API server
    uvicorn app.main:app --reload