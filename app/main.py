from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from app.routes import recipe, reviews
from app.db.session import engine, Base

app = FastAPI(
    title="TastyBytes API",
    description="API for managing recipes and reviews",
    version="1.0.0"
)


# Create database tables
Base.metadata.create_all(bind=engine)

# Mount routes
app.include_router(recipe.router)
app.include_router(reviews.router)

# Serve static files (CSS, JS if needed)
#app.mount("/static", StaticFiles(directory="app/static"), name="static")


