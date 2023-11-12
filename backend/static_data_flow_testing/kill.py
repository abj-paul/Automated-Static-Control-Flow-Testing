import re

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

