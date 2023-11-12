import re
from tokenizer_statement import tokenize

def find_variable_usage(code, variable):
    lines = code.split('\n')
    result = []

    for loc,line in enumerate(lines):
        if line.find("=")!=-1:
            right_side_of_assignment = line.split("=")[1]
            tokens = tokenize(right_side_of_assignment)
            if variable in tokens:
                result.append((variable, line, loc))

    return result