from pycparser import c_parser, c_ast

class PathFinder(c_ast.NodeVisitor):
    def __init__(self):
        self.paths = []
        self.current_path = []

    def visit_FuncDef(self, node):
        # Reset the path list for each function
        self.paths = []
        self.current_path = []
        self.generic_visit(node)

    def visit_If(self, node):
        # Add the if condition to the current path
        self.current_path.append(node)

        # Visit the true branch
        self.generic_visit(node.iftrue)

        # Check if there's an else statement
        if node.iffalse:
            # Create a copy of the current path for the false branch
            false_branch_path = self.current_path.copy()

            # Reset the current path to the state before the if statement
            self.current_path.pop()

            # Add the else condition to the current path
            self.current_path.append(node.iffalse)

            # Visit the false branch
            self.generic_visit(node.iffalse)

            # Combine the paths of the true and false branches
            combined_path = self.current_path.copy()
            self.paths.append(tuple(combined_path))

            # Reset the current path to the state before the if statement
            self.current_path = false_branch_path

        # Reset the current path to the state before the if statement
        self.current_path.pop()

    def generic_visit(self, node):
        # Add the current node to the path
        self.current_path.append(node)
        super().generic_visit(node)
        # Remove the current node from the path after visiting its children
        self.current_path.pop()

def find_paths_in_c_code(file_path):
    with open(file_path, 'r') as f:
        code = f.read()

    parser = c_parser.CParser()
    ast = parser.parse(code, filename=file_path)

    path_finder = PathFinder()
    path_finder.visit(ast)

    return path_finder.paths

if __name__ == "__main__":
    # Replace 'your_code.c' with the path to your C code file
    c_code_file = '../project-to-test/paths.c'
    
    paths = find_paths_in_c_code(c_code_file)

    print("Independent Paths:")
    for i, path in enumerate(paths, 1):
        print(f"Path {i}: {path}")
