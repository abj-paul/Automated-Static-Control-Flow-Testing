import re
import pycparser

def extract_functions_from_c_code(c_code):
    # Regular expression to match C function definitions including the body
    pattern = r'\w+\s+\w+\s*\(.*\)\s*{[^}]*}'
    function_matches = re.findall(pattern, c_code, re.DOTALL)

    return function_matches

def build_ast_for_function_using_pycparser(c_function_code):
    # Define a C parser using pycparser
    parser = pycparser.CParser()

    try:
        # Parse the function code to generate the AST
        ast = parser.parse(c_function_code)
        return ast
    except pycparser.c_parser.ParseError as e:
        print(f"Parse error: {e}")
        return None
