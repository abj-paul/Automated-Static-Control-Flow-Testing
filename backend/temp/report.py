from jinja2 import Template
import os

def generate_report(data):
    # Load the HTML template
    template_path = 'report_template.html'
    with open(template_path, 'r') as template_file:
        template_content = template_file.read()
    
    template = Template(template_content)

    # Define the path where the reports will be saved
    reports_path = 'reports'
    os.makedirs(reports_path, exist_ok=True)

    # Generate reports for each function
    for idx, function_data in enumerate(zip(data["functions"], data["asts"], data["variables"]), 1):
        function_name, ast, variables = function_data

        # Create a unique report for each function
        report_filename = f"{function_name}_report.html"
        report_path = os.path.join(reports_path, report_filename)

        # Render the HTML template with the function-specific data
        rendered_content = template.render(
            function_name=function_name,
            ast=ast,
            variables=variables,
            metrics=data["metrics"],
            smell=data["smell"]
        )

        # Save the report to the specified path
        with open(report_path, 'w') as report_file:
            report_file.write(rendered_content)

        print(f"Report for {function_name} generated: {report_path}")
    return report_path

