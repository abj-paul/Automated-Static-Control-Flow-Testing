from pycparser import CParser
from backend.CFG_C import cfg_node
import sys

parser = CParser()
c_keywords = ["auto", "break", "case", "char", "const", "continue", "default", "do", "double", "else", "enum", "extern", "float", "for", "goto", "if", "int", "long", "register", "return", "short", "signed", "sizeof", "static", "struct", "switch", "typedef", "union", "unsigned", "void", "volatile", "while","printf", "scanf"
]
# Define a visitor class to traverse the AST and collect variable names
class VariableVisitor(cfg_node.NodeVisitor):
    def __init__(self):
        self.variables = set()

    def visit_ID(self, node):
        # This method is called when an identifier (variable) is encountered
        if node.name not in c_keywords:
            self.variables.add(node.name)

def find_variables_to_test(c_function_code):
    ast = parser.parse(c_function_code)
    variable_visitor = VariableVisitor()
    variable_visitor.visit(ast)

    return variable_visitor.variables

