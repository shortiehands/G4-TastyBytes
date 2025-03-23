# Test the database connection to AWS RDS MySQL instance

import pytest
import sqlalchemy
from sqlalchemy import create_engine
from sqlalchemy.exc import OperationalError
from unittest.mock import MagicMock
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Get DB credentials from .env
DATABASE_USER = os.getenv("DATABASE_USER")
DATABASE_PASSWORD = os.getenv("DATABASE_PASSWORD")
DATABASE_HOST = os.getenv("DATABASE_HOST")
DATABASE_NAME = os.getenv("DATABASE_NAME")
DATABASE_PORT = os.getenv("DATABASE_PORT", 3306)

# Construct the Database URL
TEST_DATABASE_URL = f"mysql+pymysql://{DATABASE_USER}:{DATABASE_PASSWORD}@{DATABASE_HOST}:{DATABASE_PORT}/{DATABASE_NAME}"

@pytest.fixture
def mock_db_connection():
    """Mock the database engine for testing."""
    mock_engine = MagicMock()
    return mock_engine

def test_aws_rds_connection():
    """Check if AWS MySQL RDS is reachable."""
    try:
        engine = create_engine(TEST_DATABASE_URL)
        with engine.connect() as connection:
            result = connection.execute(sqlalchemy.text("SELECT 1")).scalar()
            assert result == 1, "Database connection failed!"
        print("✅ AWS RDS Connection Successful")
    except OperationalError:
        pytest.fail("❌ AWS RDS Connection Failed")

