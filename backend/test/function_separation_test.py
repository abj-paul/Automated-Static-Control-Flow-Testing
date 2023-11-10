import sys
sys.path.append('..')

from AST import separate_functions

c_code = """
#include <stdio.h>

void hello() {
    printf("Hello, world!\n");
}

int add(int a, int b) {
    return a + b;
}

int main() {
    int result = add(5, 3);
    printf("Result: %d\n", result);
    return 0;
}
"""

# Separate code into function segments
function_segments = separate_functions(c_code)

# Print each function segment
for i, segment in enumerate(function_segments):
    print(f"Function {i+1}:\n{segment}\n")
