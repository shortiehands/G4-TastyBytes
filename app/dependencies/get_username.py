# app/dependencies/get_username.py
from fastapi import Header, HTTPException, status

def get_username(x_username: str = Header(...)):
    if not x_username:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing username header"
        )
    return x_username
