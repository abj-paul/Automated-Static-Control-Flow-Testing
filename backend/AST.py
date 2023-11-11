class ASTNode:
    def __init__(self, node_type, value=None, children=None):
        self.node_type = node_type
        self.value = value
        self.children = children if children is not None else []

    def add_child(self, child):
        self.children.append(child)

def build_ast_for_function(c_function_code):
    # Tokenize the C function code (a very basic tokenizer for demonstration purposes)
    tokens = c_function_code.replace('(', ' ( ').replace(')', ' ) ').split()

    # Define the types of nodes we want to recognize
    FUNCTION_DECLARATION = "FUNCTION_DECLARATION"
    VARIABLE_DECLARATION = "VARIABLE_DECLARATION"
    STATEMENT = "STATEMENT"
    KEYWORD = "KEYWORD"
    EXPRESSION = "EXPRESSION"
    LOOP = "LOOP"
    CONDITIONAL = "CONDITIONAL"
    FUNCTION_CALL = "FUNCTION_CALL"

    def parse(tokens):
        ast = ASTNode(FUNCTION_DECLARATION)
        tokens.pop(0)  # Remove the return type (e.g., "int")

        # Parse the function name
        ast.add_child(ASTNode(VARIABLE_DECLARATION, value=tokens.pop(0)))

        # Parse the parameters
        while tokens.pop(0) != "(":
            pass  # Ignore parameters for simplicity

        # Parse the function body
        ast.add_child(ASTNode(STATEMENT, children=parse_statement(tokens)))

        return ast

    def parse_statement(tokens):
        statement = ASTNode(STATEMENT)

        while tokens:
            token = tokens.pop(0)

            if token == ";":
                break  # End of the statement
            elif token in ("int", "void", "return"):
                # Handle keywords (e.g., "return")
                statement.add_child(ASTNode(KEYWORD, value=token))
            elif token in ("if", "else"):
                # Handle conditionals
                statement.add_child(ASTNode(CONDITIONAL, value=token, children=parse_statement(tokens).children))
            elif token in ("while", "for"):
                # Handle loops
                statement.add_child(ASTNode(LOOP, value=token, children=parse_statement(tokens).children))
            elif token == "{":
                # Handle block statements
                statement.add_child(ASTNode(STATEMENT, children=parse_statement(tokens).children))
            elif token == "}":
                # End of block statement
                break
            elif token not in ("(", ")", "{", "}"):
                # Assume it's an expression, variable, or function call
                statement.add_child(ASTNode(EXPRESSION, value=token))

        return statement

    # Call the parsing functions
    return parse(tokens)

def print_ast(node, indent=0):
    if node.value:
        print("  " * indent + f"{node.node_type}({node.value}):")
    else:
        print("  " * indent + f"{node.node_type}:")

    if isinstance(node.children, list):
        for child in node.children:
            if isinstance(child, ASTNode):
                print_ast(child, indent + 1)
            else:
                print("  " * (indent + 1) + f"{child}")
    elif node.children is not None:
        if isinstance(node.children, ASTNode):
            print_ast(node.children, indent + 1)
        else:
            print("  " * (indent + 1) + f"{node.children}")
