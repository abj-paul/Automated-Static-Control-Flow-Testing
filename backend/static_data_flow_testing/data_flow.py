import re
from static_data_flow_testing.kill import find_where_scope_ends_given_definition_loc
from static_data_flow_testing.find_variable import find_variable_usage, keep_unique_dicts

def detect_data_flow_data_flow_table(c_code):
    # Regular expressions to match variable definitions, kills, and uses
    definition_pattern = re.compile(r'(\b\w+\b)\s*=\s*.*;')

    # Extract variable definitions, kills, and uses with line numbers
    lines = c_code.split('\n')
    definitions = [(match.group(1), match.group(), i, "d") for i, line in enumerate(lines) for match in definition_pattern.finditer(line)]
    kills = []
    uses = []
    for variable, _, loc, _ in definitions:
        uses.extend(find_variable_usage(lines, variable))
        eol = find_where_scope_ends_given_definition_loc(c_code, loc)
        kills.append((variable, lines[eol] ,eol, "k"))

    
    duk_list = definitions + kills + uses
    duk_list.sort(key=lambda x: x[2])

    # Detect data-flow data_flow_table
    data_flow_table = []
    for variable1, line1, lineno1, _ in definitions:
        for variable2, line2, lineno2, _ in definitions:
            if variable1==variable2 and lineno1<lineno2:
                data_flow_table.append({
                    "variable": variable1,
                    "data_flow_pattern": 'dd',
                    "lines": (lineno1, lineno2),
                    "first_line": line1,
                    "second_line": line2
                    })
                break
        for variable2, line2, lineno2, _ in uses:
            if variable1==variable2 and lineno1<lineno2:
                data_flow_table.append({
                    "variable": variable1,
                    "data_flow_pattern": 'du',
                    "lines": (lineno1, lineno2),
                    "first_line": line1,
                    "second_line": line2
                    })
                break
        for variable2, line2, lineno2, _ in kills:
            if variable1==variable2 and lineno1<lineno2:
                data_flow_table.append({
                    "variable": variable1,
                    "data_flow_pattern": 'dk',
                    "lines": (lineno1, lineno2),
                    "first_line": line1,
                    "second_line": line2
                    })
                break

    for variable1, line1, lineno1, _ in uses:
        for variable2, line2, lineno2, _ in definitions:
            if variable1==variable2 and lineno1<lineno2:
                data_flow_table.append({
                    "variable": variable1,
                    "data_flow_pattern": 'ud',
                    "lines": (lineno1, lineno2),
                    "first_line": line1,
                    "second_line": line2
                    })
                break
        for variable2, line2, lineno2, _ in uses:
            if variable1==variable2 and lineno1<lineno2:
                data_flow_table.append({
                    "variable": variable1,
                    "data_flow_pattern": 'uu',
                    "lines": (lineno1, lineno2),
                    "first_line": line1,
                    "second_line": line2
                    })
                break
     
    
    for index in range(0, len(duk_list)-2):
        if duk_list[index][3]=="k":
            variable1, line1, lineno1, pattern1 = duk_list[index-1]
            variable2, line2, lineno2, pattern2 = duk_list[index]
            if lineno1>=lineno2: 
                continue
            data_flow_table.append({
                    "variable": variable1,
                    "data_flow_pattern": pattern1+pattern2,
                    "lines": (lineno1, lineno2),
                    "first_line": line1,
                    "second_line": line2
                    })
        
    return keep_unique_dicts(data_flow_table)

# # Example C function
# c_function = """
# void example_function() {
#     int a = 10;  // Defined (d)
#     int b = a + 5;  // Defined (d), Usage (u)
#     int c = b * 2;  // Defined (d), Usage (u)
#     int d = c;  // Defined (d), Usage (u)

#     if (d > 0) {
#         a = a + 1;  // Usage (u)
#         int e = a * 2;  // Defined (d), Usage (u)
#     }

#     // Assume releasing memory or closing a file here
# }
# """

# data_flow_data_flow_table = detect_data_flow_data_flow_table(c_function)

# for anomaly in data_flow_data_flow_table:
#     print(f"{anomaly['variable']} | {anomaly['data_flow_pattern']} | {anomaly['lines']}")