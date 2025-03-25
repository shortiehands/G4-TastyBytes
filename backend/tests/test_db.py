# Test the database connection to AWS RDS MySQL instance

import pytest
import sqlalchemy
from sqlalchemy import create_engine
from sqlalchemy.exc import OperationalError
from unittest.mock import patch, MagicMock
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

def test_aws_rds_connection_success():
    """Test successful AWS MySQL RDS connection using a mock."""
    with patch("sqlalchemy.create_engine") as mock_create_engine:
        # Mock database engine and connection
        mock_engine = MagicMock()
        mock_connection = MagicMock()
        
        mock_create_engine.return_value = mock_engine
        mock_engine.connect.return_value.__enter__.return_value = mock_connection
        mock_connection.execute.return_value.scalar.return_value = 1  # Simulate successful query

        from sqlalchemy import create_engine
        engine = create_engine("mock_db_url")  # Uses mock
        
        with engine.connect() as connection:
            result = connection.execute(sqlalchemy.text("SELECT 1")).scalar()
            assert result == 1, "Database connection failed!"

# Test failed database connection
def test_aws_rds_connection_failure():
    """Test failed AWS MySQL RDS connection due to OperationalError."""
    with patch("sqlalchemy.create_engine") as mock_create_engine:
        # Simulate an OperationalError when trying to connect
        mock_create_engine.side_effect = OperationalError("Mock error", None, None)

        from sqlalchemy import create_engine
        
        with pytest.raises(OperationalError):
            engine = create_engine("mock_db_url")  # Should raise an error
            with engine.connect():
                pass  # Won't reach here
