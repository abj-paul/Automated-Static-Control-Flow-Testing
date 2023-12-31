from fastapi import FastAPI, Request;
from urllib.parse import unquote
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
from fastapi.responses import JSONResponse
from fastapi.responses import StreamingResponse
from fastapi import Response
import os
from static_data_flow_testing.data_flow import detect_data_flow_data_flow_table
import json
from static_control_flow_testing.AST import generate_ast_and_get_json
from static_control_flow_testing.SeparateFunctions import extract_functions_from_c_file
from static_control_flow_testing.VariableHoisting import find_variables_to_test
from static_control_flow_testing.CheckCodingStyle import get_variable_cases
from static_control_flow_testing.Metrics import calculate_metrics
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

    result = {
        "functions": functions,
        "asts": asts,
        "metrics": calculate_metrics(code_link),
        "variables": variables,
        "smell": get_variable_cases(code_link)
    }

    # with open(f'../graph-visualization/public/{hash(code_link)}.json', 'w') as f:
    #     json.dump(result, f)
    file = open(f'../graph-visualization/public/{hash(code_link)}.json', 'w') 
    file.write(result) 
    file.close() 

    return f'../graph-visualization/public/{hash(code_link)}.json'

@app.post("/api/v1/code/project")
async def generate_AST_from_project_url(code_url: ASTRequest):
    project_path = code_url.code_url #'./project-to-test/'
    asts = []
    variables = []
    all_functions = []
    metrics = []
    smells = []
    corresponding_filenames = []
    for root, _, filenames in os.walk(project_path):
        for filename in filenames:
            if filename.endswith('.c'):
                print(f"DEBUG: Processing {filename}...")
                filepath = os.path.join(root, filename)
                functions = extract_functions_from_c_file(filepath)
                #print(f"DEBUG: {functions}")
                file_asts = []
                file_variables = []
                for function in functions:
                    file_asts.append(generate_ast_and_get_json(function))
                    file_variables.append(find_variables_to_test(function))
                    corresponding_filenames.append(filename)

                asts.append(file_asts)
                variables.append(file_variables)
                all_functions.append(functions)
                metrics.append(calculate_metrics(filepath))
                print(f"DEBUG: cases = {get_variable_cases(filepath)}")
                smells.append(get_variable_cases(filepath))
   
    results =  {
        "filenames": corresponding_filenames,
        "functions": all_functions,
        "asts": asts,
        "metrics": metrics,
        "variables": variables,
        "smell": smells
    }
    #print(generate_report(results))


    return results

@app.post("/api/v1/dataflow/code/file/")
async def generate_AST_from_code_url(code_url: ASTRequest):
    code_link = code_url.code_url
    functions = extract_functions_from_c_file(code_link)
    data_flow_tables = []
    corresponding_filenames = []
    for function in functions:
        print(f"DEBUG: {function}")
        data_flow_tables.append(detect_data_flow_data_flow_table(function))
        corresponding_filenames.append(code_link)


    return {
        "functions": functions,
        "filenames": corresponding_filenames,
        "data_flow_tables": data_flow_tables
    }
@app.post("/api/v1/dataflow/code/project/")
async def generate_AST_from_code_url(code_url: ASTRequest):
    project_path = code_url.code_url
    data_flow_tables = []
    corresponding_filenames = []

    for root, _, filenames in os.walk(project_path):
        for filename in filenames:
            if filename.endswith('.c'):
                print(f"DEBUG: Processing {filename}...")
                filepath = os.path.join(root, filename)
                functions = extract_functions_from_c_file(filepath)
                data_flow_table_for_file = []
                for function in functions:
                    #print(f"DEBUG: {function}")
                    data_flow_table_for_file.append(detect_data_flow_data_flow_table(function))
                    corresponding_filenames.append(filename)
            data_flow_tables.append(data_flow_table_for_file)

    return {
        "functions": functions,
        "filenames": corresponding_filenames,
        "data_flow_tables": data_flow_tables
    }