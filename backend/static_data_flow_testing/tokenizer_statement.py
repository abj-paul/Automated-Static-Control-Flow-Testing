import sys
sys.path.append("..")
from CFG_C.ply.ply import lex

# Define the lexer rules
tokens = (
    'KEYWORD',
    'IDENTIFIER',
    'LPAREN',
    'RPAREN',
    'LBRACE',
    'RBRACE',
    'LBRACKET',
    'RBRACKET',
    'SEMICOLON',
    'COMMA',
    'OPERATOR',
    'COMMENT',  # New token for comments
)

t_KEYWORD = r'\b(?:int|float|char|double|void|if|else|for|while|return|\w+)\b'
t_LPAREN = r'\('
t_RPAREN = r'\)'
t_LBRACE = r'\{'
t_RBRACE = r'\}'
t_LBRACKET = r'\['
t_RBRACKET = r'\]'
t_SEMICOLON = r';'
t_COMMA = r','
t_OPERATOR = r'\+|\-|\*|\/|==|!=|<|>|<=|>=|='

# Define a rule to match identifiers
def t_IDENTIFIER(t):
    r'[a-zA-Z_][a-zA-Z0-9_]*'
    t.type = 'IDENTIFIER'
    return t

# Define a rule to ignore whitespace
t_ignore = ' \t'

# Define a rule to skip comments
def t_COMMENT(t):
    r'\/\/.*|\/\*([^*]|[\r\n]|(\*+([^*\/]|[\r\n])))*\*+\/'
    pass  # Ignore comments

# Error handling rule
def t_error(t):
    print(f"Illegal character '{t.value[0]}'")
    t.lexer.skip(1)

# Build the lexer
lexer = lex()

def tokenize(c_code_line):
    lexer.input(c_code_line)
    identifiers = []

    while True:
        tok = lexer.token()
        if not tok:
            break
        #if tok.type == 'IDENTIFIER':
        identifiers.append(tok.value)
    return identifiers


