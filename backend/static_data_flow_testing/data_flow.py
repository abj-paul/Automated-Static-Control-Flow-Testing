import re

from find_variable import find_variable_usage

def detect_data_flow_anomalies(c_code):
    # Regular expressions to match variable definitions, kills, and uses
    definition_pattern = re.compile(r'(\b\w+\b)\s*=\s*.*;')
    kill_pattern = re.compile(r'(\b\w+\b)\s*=\s*.*\(.*\);')  # Assuming kills involve function calls

    # Extract variable definitions, kills, and uses with line numbers
    lines = c_code.split('\n')
    definitions = [(match.group(1), match.group(), i) for i, line in enumerate(lines) for match in definition_pattern.finditer(line)]
    kills = [(match.group(1), match.group(), i+1) for i, line in enumerate(lines) for match in kill_pattern.finditer(line)]
    uses = []
    for variable, _, _ in definitions:
        uses.extend(find_variable_usage(lines, variable))

    print(f"DEbug: D={definitions}")
    print(f"DEbug: U={uses}")
    print(f"DEbug: K={kills}")

    # Detect data-flow anomalies
    anomalies = []
    for variable1, line1, lineno1 in definitions:
        for variable2, line2, lineno2 in definitions:
            if variable1==variable2 and lineno1<lineno2:
                anomalies.append({
                    "variable": variable1,
                    "data_flow_pattern": 'dd',
                    "lines": (lineno1, lineno2),
                    "first_line": line1,
                    "second_line": line2
                    })
                break
        for variable2, line2, lineno2 in uses:
            if variable1==variable2 and lineno1<lineno2:
                anomalies.append({
                    "variable": variable1,
                    "data_flow_pattern": 'du',
                    "lines": (lineno1, lineno2),
                    "first_line": line1,
                    "second_line": line2
                    })
                break
        for variable2, line2, lineno2 in kills:
            if variable1==variable2 and lineno1<lineno2:
                anomalies.append({
                    "variable": variable1,
                    "data_flow_pattern": 'dk',
                    "lines": (lineno1, lineno2),
                    "first_line": line1,
                    "second_line": line2
                    })
                break
    return anomalies

# Example C function
c_function = """
void example_function() {
    int a = 10;  // Defined (d)
    int b = a + 5;  // Defined (d), Usage (u)
    int c = b * 2;  // Defined (d), Usage (u)
    int d = c;  // Defined (d), Usage (u)

    if (d > 0) {
        a = a + 1;  // Usage (u)
        int e = a * 2;  // Defined (d), Usage (u)
    }

    // Assume releasing memory or closing a file here
}
"""

data_flow_anomalies = detect_data_flow_anomalies(c_function)

for anomaly in data_flow_anomalies:
    print(f"{anomaly['variable']} | {anomaly['data_flow_pattern']} | {anomaly['lines']}")