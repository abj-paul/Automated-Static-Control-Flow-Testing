import re

def extract_functions_from_c_file(file_path):
    with open(file_path, 'r') as file:
        content = file.read()

    # Regular expression to match C function declarations along with their bodies
    function_pattern = re.compile(r'\b\w+\s+\w+\([^)]*\)\s*{(?:[^{}]*{[^{}]*}[^{}]*)*[^{}]*}')

    # Find all matches in the file content
    matches = function_pattern.findall(content)

    # Return the list of functions along with their code
    return matches

