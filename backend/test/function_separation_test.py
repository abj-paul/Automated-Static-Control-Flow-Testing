import sys
sys.path.append("..")
from preprocessing import extract_functions_from_c_code

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
