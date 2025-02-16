import logging
from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import JSONResponse
from fastapi.security import HTTPBearer
#from app.routes import books, ai, chroma, reviews
from app.exceptions import ServiceException

# Uncomment this line to include the Auth router
from app.routes import auth
from fastapi.middleware.cors import CORSMiddleware



security = HTTPBearer()

app = FastAPI(
    title="Recipe App",
    description="An application to quickly formulate recipe ideas based on avaialble ingredients",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allow frontend requests
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Global exception handler for HTTP exceptions
@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    logger.warning(f"HTTP exception occurred: {str(exc)}")
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.detail},
    )

# Global exception handler for custom exceptions
@app.exception_handler(ServiceException)
async def http_exception_handler(request: Request, exc: HTTPException):
    logger.warning(f"Service exception occurred: {str(exc)}")
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.detail},
    )

# Global exception handler for unhandled exceptions
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error(f"Unhandled exception occurred: {str(exc)}")
    return JSONResponse(
        status_code=500,
        content={"detail": "An unexpected error occurred"}
    )

# Include routes
# app.include_router(books.router, prefix="/books", tags=["Books"])
# app.include_router(reviews.router, prefix="", tags=["Reviews"])
# app.include_router(ai.router, prefix="/ai", tags=["AI"])
# app.include_router(chroma.router, prefix="/chroma", tags=["ChromaDB"])
# Uncomment this line to include the Auth router
app.include_router(auth.router, prefix="", tags=["Auth"])