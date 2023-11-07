from fastapi import FastAPI, Request;
from urllib.parse import unquote
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
from fastapi.responses import JSONResponse
from fastapi.responses import StreamingResponse
import os

from AST import generate_ast_and_get_json
from VariableHoisting import find_variables_to_test

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
    ast = generate_ast_and_get_json(code_link)
    return {
        "ast": ast,
        "variables": find_variables_to_test(code_link) 
    }
@app.post("/api/v1/code/project")
async def generate_AST_from_project_url(code_url: ASTRequest):
    project_path = code_url.code_url #'./project-to-test/'
    asts = []
    variables = []
    for root, _, filenames in os.walk(project_path):
        for filename in filenames:
            if filename.endswith('.c'):
                filepath = os.path.join(root, filename)
                ast = generate_ast_and_get_json(filepath)
                asts.append(ast)
                variables.append(find_variables_to_test(filepath))

    return {
        "numberOfAsts": len(asts),
        "asts": asts,
        "variables": variables 
    }