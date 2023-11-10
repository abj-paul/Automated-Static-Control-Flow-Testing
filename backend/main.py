from fastapi import FastAPI, Request;
from urllib.parse import unquote
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
from fastapi.responses import JSONResponse
from fastapi.responses import StreamingResponse
import os

from AST import generate_ast_and_get_json
from SeparateFunctions import extract_functions_from_c_file
from VariableHoisting import find_variables_to_test
from backend.CheckCodingStyle import get_variable_cases
from backend.Metrics import calculate_metrics
from backend.temp.report import generate_report

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

functions = []

@app.post("/api/v1/code/file")
async def generate_AST_from_code_url(code_url: ASTRequest):
    code_link = code_url.code_url
    functions = extract_functions_from_c_file(code_link)
    asts = []
    variables = []
    for function in functions:
        print(f"DEBUG: {function}")

        asts.append(generate_ast_and_get_json(function))
        variables.append(find_variables_to_test(function))

    return {
        "functions": functions,
        "asts": asts,
        "metrics": calculate_metrics(code_link),
        "variables": variables,
        "smell": get_variable_cases(code_link)
    }

@app.post("/api/v1/code/project")
async def generate_AST_from_project_url(code_url: ASTRequest):
    project_path = code_url.code_url #'./project-to-test/'
    asts = []
    variables = []
    all_functions = []
    metrics = []
    smells = []
    for root, _, filenames in os.walk(project_path):
        for filename in filenames:
            if filename.endswith('.c'):
                print(f"DEBUG: Processing {filename}...")
                filepath = os.path.join(root, filename)
                functions = extract_functions_from_c_file(filepath)
                print(f"DEBUG: {functions}")
                file_asts = []
                file_variables = []
                for function in functions:
                    file_asts.append(generate_ast_and_get_json(function))
                    file_variables.append(find_variables_to_test(function))
                asts.append(file_asts)
                variables.append(file_variables)
                all_functions.append(functions)
                metrics.append(calculate_metrics(filepath))
                smells.append(get_variable_cases(filepath))
   
    results =  {
        "functions": all_functions,
        "asts": asts,
        "metrics": metrics,
        "variables": variables,
        "smell": smells
    }
    #print(generate_report(results))


    return results