import re
from tokenizer_statement import tokenize

def find_variable_usage(lines, variable):
    result = []

    for loc,line in enumerate(lines):
        if line.find("=")!=-1:
            right_side_of_assignment = line.split("=")[1]
            tokens = tokenize(right_side_of_assignment)
            if variable in tokens:
                result.append((variable, line, loc, "u"))

    return result

def keep_unique_dicts(lst):
    seen_dicts = set()
    unique_dicts = []

    for d in lst:
        dict_tuple = tuple(sorted(d.items()))
        if dict_tuple not in seen_dicts:
            seen_dicts.add(dict_tuple)
            unique_dicts.append(d)

    return unique_dicts