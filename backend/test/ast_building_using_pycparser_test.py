import sys
sys.path.append("..")
from preprocessing import build_ast_for_function_using_pycparser

# Example C function code
c_function_code = """
int add(int a, int b) {
    return a + b;
}
"""

# Call the function to build the AST for the C function
function_ast = build_ast_for_function_using_pycparser(c_function_code)

if function_ast:
    # Print the AST in a human-readable format
    print(function_ast)

