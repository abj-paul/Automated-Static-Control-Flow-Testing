import re

def extract_functions_from_c_code(c_code):
    # Regular expression to match C function definitions including the body
    pattern = r'\w+\s+\w+\s*\(.*\)\s*{[^}]*}'
    function_matches = re.findall(pattern, c_code, re.DOTALL)

    return function_matches

# Example C code
c_code = """
int add(int a, int b) {
    return a + b;
}

void print_message(char *message) {
    printf("%s\n", message);
}
"""

functions = extract_functions_from_c_code(c_code)
for func in functions:
    print(func)
