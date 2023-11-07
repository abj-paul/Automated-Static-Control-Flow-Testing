from pycparser import parse_file, c_ast
import sys

def parse_c_file(filepath):
    with open(filepath, 'r') as f:
        code = f.read()

    ast = parse_file(filepath, use_cpp=True)
    return ast

# Function to collect independent paths
def collect_independent_paths(node, path=[]):
    if node is None:
        return

    if isinstance(node, c_ast.If):
        # This is a conditional statement
        # You can collect independent paths here
        path.append(node)
        print("Found an 'if' statement")
        # Process the 'if' branch
        collect_independent_paths(node.iftrue, path)
        path.pop()  # Backtrack
        # Process the 'else' branch
        collect_independent_paths(node.iffalse, path)

    elif isinstance(node, c_ast.While):
        # This is a while loop
        # You can collect independent paths here
        path.append(node)
        print("Found a 'while' loop")
        # Process the loop body
        collect_independent_paths(node.stmt, path)
        path.pop()  # Backtrack

    elif isinstance(node, c_ast.FuncCall):
        # This is a function call
        # You can collect independent paths here
        path.append(node)
        print("Found a function call:", node.name.name)
        # Process the function arguments
        for arg in node.args.exprs:
            collect_independent_paths(arg, path)
        path.pop()  # Backtrack

    else:
        # This is a simple statement or expression
        print("Processing statement or expression:", node)

# Start collecting independent paths from the AST

if __name__ == '__main__':
    if len(sys.argv) > 1:
        file_path = sys.argv[1]
        ast = parse_c_file(file_path)
        collect_independent_paths(ast)
    else:
        print("Please provide a filename as an argument")