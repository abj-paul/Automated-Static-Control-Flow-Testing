# from pycparser import c_parser/
from CFG_C import c_parser
from CFG_C import c_ast

class VariableNameVisitor(c_ast.NodeVisitor):
    def __init__(self):
        self.variable_cases = []

    def visit_Decl(self, node):
        if (isinstance(node.type, c_ast.TypeDecl) and isinstance(node.type.type, c_ast.IdentifierType)) or isinstance(node.type, c_ast.FuncDecl):
            variable_name = node.name
            variable_case = self.get_variable_case(variable_name)
            self.variable_cases.append((variable_name, variable_case))
        self.generic_visit(node)

    def get_variable_case(self, name):
        if name.isidentifier():
            if name[0].islower() and any(x.isupper() for x in name):
                return 'camelCase'
            elif name[0].isupper() and any(x.islower() for x in name):
                return 'PascalCase'
            elif '_' in name:
                return 'snake_case'
            else:
                return 'Smell!'
        else:
            return 'Invalid'

def get_variable_cases(file_path):
    with open(file_path, 'r') as file:
        code = file.read()
        parser = c_parser.CParser()
        ast = parser.parse(code, filename='<string>')

        visitor = VariableNameVisitor()
        visitor.visit(ast)

        return visitor.variable_cases

