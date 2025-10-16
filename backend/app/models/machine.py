# backend/app/models/machine.py
from sqlalchemy import Column, Integer, String
from app.db.base import Base  # Import Base from the base module

class Machine(Base):
    __tablename__ = "machines"

    id = Column(Integer, primary_key=True, index=True)
    asset_number = Column(String, unique=True, index=True, nullable=False)
    model = Column(String, nullable=False)
    manufacturer = Column(String, nullable=False)
    line_number = Column(String, nullable=False)
