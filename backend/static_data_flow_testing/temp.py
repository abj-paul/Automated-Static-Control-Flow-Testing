import re

def detect_data_flow_anomalies(c_code):
    # Regular expressions to match variable definitions, kills, and uses
    definition_pattern = re.compile(r'\b(\w+)\s*=\s*.*;')
    kill_pattern = re.compile(r'\b(\w+)\s*=\s*.*\(.*\);')  # Assuming kills involve function calls
    use_pattern = re.compile(r'\b(\w+)\s*=\s*.*;')

    # Extract variable definitions, kills, and uses
    definitions = definition_pattern.findall(c_code)
    kills = kill_pattern.findall(c_code)
    uses = use_pattern.findall(c_code)

    # Detect data-flow anomalies
    anomalies = set()
    usual_cases = set()

    for variable in definitions:
        if variable in definitions:
            anomalies.add('dd')
        elif variable in uses:
            usual_cases.add('du')
        elif variable in kills:
            anomalies.add('dk')

    for variable in uses:
        if variable in definitions:
            anomalies.add('ud')
        elif variable in uses:
            usual_cases.add('uu')
        elif variable in kills:
            usual_cases.add('uk')
    
    for variable in kills:
        if variable in definitions:
            usual_cases.add('kd')
        elif variable in uses:
            anomalies.add('ku')
        elif variable in kills:
            anomalies.add('kk')

    return usual_cases,anomalies

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

data_flow_usual_cases, data_flow_anomalies = detect_data_flow_anomalies(c_function)

print(f"Data Flow Normal Cases: {data_flow_usual_cases}")
print(f"Data Flow Anomalous Cases: {data_flow_anomalies}")

'''
import re

def detect_data_flow_anomalies(c_code):
    # Regular expressions to match variable definitions, kills, and uses
    definition_pattern = re.compile(r'(\b\w+\b)\s*=\s*.*;')
    kill_pattern = re.compile(r'(\b\w+\b)\s*=\s*.*\(.*\);')  # Assuming kills involve function calls
    use_pattern = re.compile(r'(\b\w+\b)\s*=\s*.*;')

    # Extract variable definitions, kills, and uses with line numbers
    lines = c_code.split('\n')
    definitions = [(match.group(1), match.group(), i+1) for i, line in enumerate(lines) for match in definition_pattern.finditer(line)]
    kills = [(match.group(1), match.group(), i+1) for i, line in enumerate(lines) for match in kill_pattern.finditer(line)]
    uses = [(match.group(1), match.group(), i+1) for i, line in enumerate(lines) for match in use_pattern.finditer(line)]

    print(f"Debug: D = {definitions}")
    print(f"Debug: U = {uses}")
    print(f"Debug: K = {kills}")


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
        for variable2, line2, lineno2 in uses:
            if variable1==variable2 and lineno1<lineno2:
                anomalies.append({
                    "variable": variable1,
                    "data_flow_pattern": 'du',
                    "lines": (lineno1, lineno2),
                    "first_line": line1,
                    "second_line": line2
                    })
        for variable2, line2, lineno2 in kills:
            if variable1==variable2 and lineno1<lineno2:
                anomalies.append({
                    "variable": variable1,
                    "data_flow_pattern": 'dk',
                    "lines": (lineno1, lineno2),
                    "first_line": line1,
                    "second_line": line2
                    })
        print(f"Debug: Covering variable {variable1}")


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

print(f"DEbug: {data_flow_anomalies}")

'''