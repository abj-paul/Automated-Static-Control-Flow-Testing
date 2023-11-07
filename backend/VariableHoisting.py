from pycparser import parse_file, c_ast
import sys

# Define a visitor class to traverse the AST and collect variable names
class VariableVisitor(c_ast.NodeVisitor):
    def __init__(self):
        self.variables = set()

    def visit_ID(self, node):
        # This method is called when an identifier (variable) is encountered
        self.variables.add(node.name)

# Load the C file and parse it into an AST
def parse_c_file(filepath):
    with open(filepath, 'r') as f:
        code = f.read()

    ast = parse_file(filepath, use_cpp=True)
    return ast

def find_variables_to_test(filepath):
    ast = parse_c_file(filepath)
    variable_visitor = VariableVisitor()
    variable_visitor.visit(ast)

    return variable_visitor.variables
'''
if __name__ == '__main__':
    if len(sys.argv) > 1:
        file_path = sys.argv[1]
        variables = find_variables_to_test(file_path)

        print("Variables to test:")
        for var in variables:
            print(var)
    else:
        print("Please provide a filename as an argument")
'''
