import os
from fastapi import FastAPI, File
from starlette.middleware.cors import CORSMiddleware
from starlette.requests import Request
from starlette.responses import JSONResponse


# Setup FastAPI app
app = FastAPI(
    title="API Server",
    description="API Server",
    version="v1"
)

# Enable CORSMiddleware
app.add_middleware(
    CORSMiddleware,
    allow_credentials=False,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Application start/stop hooks


# Routes


@app.get(
    "/",
    summary="Index",
    description="Root api"
)
async def get_index():
    return {
        "message": "Welcome to the API Service"
    }


@app.post("/upload")
async def upload_file(
        file: bytes = File(...)
):
    print("predict file:", len(file), type(file))

    return {
        "size": len(file)
    }
