# Use an official Python base image
FROM python:3.11-slim

# Create a working directory inside the container
WORKDIR /g4-tastybytes/backend

# Set PYTHONPATH to include the parent directory
ENV PYTHONPATH=/g4-tastybytes

# Copy your requirements file
COPY requirements.txt /g4-tastybytes/backend/requirements.txt

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of your application code
COPY . /g4-tastybytes/backend

# Expose port 8000 (FastAPI default)
EXPOSE 8000

# Start FastAPI with uvicorn
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]