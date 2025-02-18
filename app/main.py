from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from app.routes import recipe
from app.db.session import engine, Base

app = FastAPI()


# Create database tables
Base.metadata.create_all(bind=engine)

# Mount routes
app.include_router(recipe.router)

# Serve static files (CSS, JS if needed)
#app.mount("/static", StaticFiles(directory="app/static"), name="static")


