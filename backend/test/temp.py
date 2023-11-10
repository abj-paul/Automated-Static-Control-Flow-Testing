FUNCTION_DECLARATION = "FUNCTION_DECLARATION"
VARIABLE_DECLARATION = "VARIABLE_DECLARATION"
STATEMENT = "STATEMENT"
KEYWORD = "KEYWORD"
EXPRESSION = "EXPRESSION"
LOOP = "LOOP"
CONDITIONAL = "CONDITIONAL"
FUNCTION_CALL = "FUNCTION_CALL"

class ASTNode:
    def __init__(self, node_type, value=None, children=None):
        self.node_type = node_type
        self.value = value
        self.children = [] if children is None else children

    def add_child(self, child):
        self.children.append(child)

    def __str__(self, indent=0):
        output = f"{' ' * indent}{self.node_type}\t{self.value}\n"
        if isinstance(self.children, list):
            for child in self.children:
                output += child.__str__(indent + 1)
        elif isinstance(self.children, ASTNode):
            output += self.children.__str__(indent + 1)
        return output

def build_ast_for_function(c_function_code):
    tokens = c_function_code.replace('(', ' ( ').replace(')', ' ) ').split()

    def parse(tokens):
        ast = ASTNode(FUNCTION_DECLARATION)
        tokens.pop(0)

        ast.add_child(ASTNode(VARIABLE_DECLARATION, value=tokens.pop(0)))

        while tokens.pop(0) != "(":
            pass

        ast.add_child(ASTNode(STATEMENT, children=parse_statement(tokens)))

        return ast

    def parse_statement(tokens):
        statement = ASTNode(STATEMENT)

        while tokens:
            token = tokens.pop(0)

            if token == ";":
                break
            elif token in ("int", "void", "return"):
                statement.add_child(ASTNode(KEYWORD, value=token))
            elif token == "if":
                # Parse the condition
                condition = parse_condition(tokens)
                if_block = ASTNode(CONDITIONAL, value="if", children=[condition])
                # Parse the if block
                if_block.add_child(parse_statement(tokens))
                statement.add_child(if_block)
                # Check for "else if" or "else"
                while tokens and tokens[0] in ("else", "if"):
                    else_token = tokens.pop(0)
                    if else_token == "else":
                        # Parse the "else" block
                        else_block = ASTNode(CONDITIONAL, value="else")
                        else_block.add_child(parse_statement(tokens))
                        statement.add_child(else_block)
                        break  # Exit the loop after parsing the "else" block
                    elif else_token == "if":
                        # Parse the "else if" block
                        elif_block = ASTNode(CONDITIONAL, value="else if")
                        # Parse the condition
                        condition = parse_condition(tokens)
                        elif_block.add_child(condition)
                        # Parse the "else if" block
                        elif_block.add_child(parse_statement(tokens))
                        statement.add_child(elif_block)
            elif token in ("while", "for"):
                statement.add_child(ASTNode(LOOP, value=token, children=parse_statement(tokens).children))
            elif token == "{":
                statement.add_child(ASTNode(STATEMENT, children=parse_statement(tokens).children))
            elif token == "}":
                break
            elif token not in ("(", ")", "{", "}"):
                statement.add_child(ASTNode(EXPRESSION, value=token))

        return statement

    def parse_condition(tokens):
        condition = ASTNode(CONDITIONAL)
        while tokens and tokens[0] not in ("{", "}"):
            condition.add_child(ASTNode(EXPRESSION, value=tokens.pop(0)))
        return condition

    return parse(tokens)

c_function_code = """
int add(int a, int b) {
while(a>b){
    if (a > b) {
        return a;
}else if(a==b){
return a-b;
}
else {
        return b;
    }
a--;
}
}
"""

function_ast = build_ast_for_function(c_function_code)
print(function_ast)
