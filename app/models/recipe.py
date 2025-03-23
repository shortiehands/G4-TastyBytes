from sqlalchemy import Column, Integer, String, ForeignKey, Text
from sqlalchemy.orm import relationship
from app.db.session import Base

class Recipe(Base):
    __tablename__ = "recipes"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(String)
    ingredients = Column(String)
    steps = Column(String)
    username = Column(String, index=True)

    reviews = relationship("Review", back_populates="recipe")
