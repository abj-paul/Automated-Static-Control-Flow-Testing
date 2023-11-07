from fastapi import FastAPI, Request;
from urllib.parse import unquote
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
from fastapi.responses import JSONResponse
from fastapi.responses import StreamingResponse

from lib import generate_ast_and_get_json

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Update this with the origins that should be allowed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ASTRequest(BaseModel):
    code_url: str 

@app.post("/api/v1/code/single")
async def generate_AST_from_code_url(code_url: ASTRequest):
    code_link = code_url.code_url
    return {
        "ast": generate_ast_and_get_json(code_link) 
    }