def find_closing_bracket(c_code, open_bracket_loc):
    stack = []
    
    for loc, statement in enumerate(c_code.split("\n")):
        for char in statement:
            if char == '{':
                stack.append(loc)
                print(f"debug: {stack}")
            elif char == '}':
                if not stack:
                    raise ValueError("Mismatched brackets: Found '}' without corresponding '{'")
                open_bracket_index = stack.pop()
                print(f"debug: {stack}")

                if open_bracket_index == open_bracket_loc:
                    return loc  # Found the matching closing bracket
        
    if stack:
        raise ValueError("Mismatched brackets: Found '{' without corresponding '}'")
    else:
        raise ValueError("No closing bracket found for the specified open bracket location")
