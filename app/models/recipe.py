from sqlalchemy import Column, Integer, String, Text
from sqlalchemy.orm import relationship
from app.db.session import Base

class Recipe(Base):
    __tablename__ = "recipes"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)  # ✅ Added length
    type = Column(String(100), nullable=False)   # ✅ Added length
    ingredients = Column(Text, nullable=False)
    steps = Column(Text, nullable=False)
    owner = Column(String(100), nullable=False)  # ✅ Added length
    reviews = relationship("Review", back_populates="recipe")
   
