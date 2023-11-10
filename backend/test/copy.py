FUNCTION_DECLARATION = "FUNCTION_DECLARATION"
VARIABLE_DECLARATION = "VARIABLE_DECLARATION"
STATEMENT = "STATEMENT"
KEYWORD = "KEYWORD"
LOOP = "LOOP"
CONDITIONAL = "CONDITIONAL"
FUNCTION_CALL = "FUNCTION_CALL"

class ASTNode:
    def __init__(self, type, value=None, children=None):
        self.type = type
        self.value = value
        self.children = []

    def __str__(self, indent=0):
        output = f"{' ' * indent}{self.type}\t{self.value}\n"

        if isinstance(self.children,list):
            for child in self.children:
                output += child.__str__(indent+1)
        return output

    def add_child(self, child):
        if isinstnace(child,list):
            self.children.extend(child)
        elif isinstance(child, ASTNode):
            self.children.append(child)
        else:
            print(f"ERROR! Unknown child to add to AST node!")


def build_ast_for_function(c_function_code):
    tokens = c_function_code.replace('(', ' ( ').replace(')', ' ) ').split()

    def parse(tokens):
        ast = ASTNode(FUNCTION_DECLARATION)
        tokens.pop(0)
        ast.add_child(ASTNode(VARIABLE_DECLARATION, value=tokens.pop(0)))

        while tokens.pop(0)!="(":
            pass

        node = ASTNode(VARIABLE_DECLARATION)
        children = parse_statement(tokens)
        node.add_child(children);
        ast.add_child(node);

    def parse_statement(tokens):
        statement = ASTNode(STATEMENT)

        while tokens:
            token = tokens.pop(0)

            if token==";":
                break
            elif token in ("int","void", "return"):
                statement.add_child(ASTNode(KEYWORD, value=token))
            elif token=="if":
                condition = parse_condition(tokens)

                if_block = ASTNode(CONDITIONAL, value="if")
                if_block.add_child(condition)

                children = parse_statement(tokens)
                if_block.add_child(children)
                statement.add_child(if_block)

                while tokens and tokens[0] in 

