from pycparser import CParser, c_ast
import sys

parser = CParser()

# Define a visitor class to traverse the AST and collect variable names
class VariableVisitor(c_ast.NodeVisitor):
    def __init__(self):
        self.variables = set()

    def visit_ID(self, node):
        # This method is called when an identifier (variable) is encountered
        self.variables.add(node.name)

def find_variables_to_test(c_function_code):
    ast = parser.parse(c_function_code)
    variable_visitor = VariableVisitor()
    variable_visitor.visit(ast)

    return variable_visitor.variables