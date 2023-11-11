from pycparser import c_parser, c_ast

class UnreachableCodeVisitor(c_ast.NodeVisitor):
    def __init__(self):
        self.all_nodes = set()
        self.reachable_nodes = set()

    def visit_FuncDef(self, node):
        self.all_nodes.add(node.coord)
        self.generic_visit(node)

    def visit_If(self, node):
        self.all_nodes.add(node.coord)
        self.generic_visit(node)

    def visit_Return(self, node):
        self.all_nodes.add(node.coord)
        self.reachable_nodes.add(node.coord)

def detect_unreachable_code(file_path):
    with open(file_path, 'r') as file:
        code = file.read()
        parser = c_parser.CParser()
        ast = parser.parse(code, filename=file_path)

        visitor = UnreachableCodeVisitor()
        visitor.visit(ast)

        unreachable_nodes = visitor.all_nodes - visitor.reachable_nodes
        return unreachable_nodes

unreachable_nodes = detect_unreachable_code("project-to-test/test.c")

print("Unreachable Nodes:")
for node_coord in unreachable_nodes:
    print(node_coord)
