import re

def separate_functions(c_code):
    # Use a regular expression to split the code into function segments
    function_pattern = r'\s*void\s+[\w_]+\s*\([^)]*\)|\s*(int|float|char|double|void)\s+[\w_]+\s*\([^)]*\)\s*{'
    function_segments = re.split(function_pattern, c_code)

    # Filter out empty segments
    function_segments = [segment.strip() for segment in function_segments if segment.strip()]

    return function_segments

