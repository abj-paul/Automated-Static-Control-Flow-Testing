import re
from static_data_flow_testing.tokenizer_statement import tokenize

def find_last_usage_c(code, variable_name):
    # Regular expression pattern to find variable usage
    pattern = re.compile(rf'\b{re.escape(variable_name)}\b')

    # Find all occurrences of the variable in the code
    matches = list(pattern.finditer(code))

    if matches:
        # Get the line numbers of variable usage
        line_numbers = [code.count('\n', 0, match.start()) for match in matches]

        # Get the last line number where the variable is used
        last_usage_line = max(line_numbers)

        return last_usage_line

    return None

def _find_closing_bracket(c_code, open_bracket_loc):
    stack = []
    
    for loc, statement in enumerate(c_code.split("\n")):
        for char in tokenize(statement):
            if char == '{':
                stack.append(loc)
            elif char == '}':
                if not stack:
                    raise ValueError("Mismatched brackets: Found '}' without corresponding '{'")
                open_bracket_index = stack.pop()

                if open_bracket_index == open_bracket_loc:
                    return loc  # Found the matching closing bracket
        
    if stack:
        raise ValueError("Mismatched brackets: Found '{' without corresponding '}'")
    else:
        raise ValueError("No closing bracket found for the specified open bracket location")

def _find_nearest_opening_brace(c_code, loc):
    lines = c_code.split("\n")
    
    for i in range(loc-1, -1, -1):  
        tokens = tokenize(lines[i])
        if "{" in tokens:
            return i   

def find_where_scope_ends_given_definition_loc(c_code, variable_definition_loc):
    opening_bracket_loc = _find_nearest_opening_brace(c_code, variable_definition_loc)
    closing_bracket_loc = _find_closing_bracket(c_code, opening_bracket_loc)
    return closing_bracket_loc

# c_code = """
# void main() {
#     int x = 10;
#     int y = 0;
#     if (x > 0) {
#         y = x - 1;
#         while (x > 5) {
#             y = x - 2;
#             x--;
#         }
#     } else {
#         x = y + 1;
#     }
#     anotherFunction();
#     return 0;
# }
# """
# print(f"Expected = {15} \nFound = {find_where_scope_ends_given_definition_loc(c_code, 3)}")