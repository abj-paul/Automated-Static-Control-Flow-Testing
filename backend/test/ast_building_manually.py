import sys
sys.path.append("..")
from AST import build_ast_for_function
from AST import print_ast

c_function_code = """
int add(int a, int b) {
while(a>b){
    if (a > b) {
        return a;
    } else {
        return b;
    }
a--;
}
}
"""

# Call the function to build the AST for the C function
function_ast = build_ast_for_function(c_function_code)
print_ast(function_ast)
