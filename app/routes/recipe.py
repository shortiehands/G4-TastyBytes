from fastapi import APIRouter, Depends, Request
from sqlalchemy.orm import Session
from fastapi.templating import Jinja2Templates
from fastapi.responses import RedirectResponse
from fastapi import Form

from app.db.session import SessionLocal
from app.schema.recipe import RecipeCreate
from app.services.recipe_service import get_recipes, create_recipe, delete_recipe, update_recipe

router = APIRouter()
templates = Jinja2Templates(directory="app/templates")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/")
def read_recipes(request: Request, db: Session = Depends(get_db)):
    recipes = get_recipes(db)
    return templates.TemplateResponse("index.html", {"request": request, "recipes": recipes})

@router.post("/create/")
def create_recipe_post( request: Request,
    title: str = Form(...),
    description: str = Form(...),
    ingredients: str = Form(...),
    steps: str = Form(...),
    db: Session = Depends(get_db)):
    recipe_data = RecipeCreate(title=title, description=description,ingredients=ingredients, steps=steps)   
    create_recipe(db, recipe_data)
    #return RedirectResponse("/", status_code=303)
    return {"message": "Recipe added successfully!"}

@router.post("/delete/{recipe_id}")
def delete_recipe_post(recipe_id: int, db: Session = Depends(get_db)):
    delete_recipe(db, recipe_id)
    return RedirectResponse("/", status_code=303)

@router.post("/update/")
def update_recipe_post(id: int = Form(...), title: str = Form(...), description: str = Form(...), ingredients: str = Form(...), steps: str = Form(...), db: Session = Depends(get_db)):
    update_recipe(db, id, title, description, ingredients, steps)
    return RedirectResponse("/", status_code=303)