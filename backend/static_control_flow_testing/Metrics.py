from backend.CFG_C import cfg_node
from backend.CFG_C import parser

class MetricVisitor(cfg_node.NodeVisitor):
    def __init__(self):
        self.cyclomatic_complexity = 1  # Start with 1 for the main function
        self.function_metrics = []
        self.variable_count = 0
        self.statement_count = 0

    def visit_FileAST(self, node):
        self.generic_visit(node)

    def visit_FuncDef(self, node):
        function_name = node.decl.name
        function_metrics = {
            "FunctionName": function_name,
            "CyclomaticComplexity": self.cyclomatic_complexity,
            "NumberOfStatements": 0,  # Initialize to 0, will be updated during the visit
            "NumberOfVariables": 0  # Initialize to 0, will be updated during the visit
        }

        self.generic_visit(node)
        function_metrics["NumberOfStatements"] = len(node.body.block_items)
        function_metrics["NumberOfVariables"] = self.variable_count
        self.function_metrics.append(function_metrics)

        # Reset variable count for the next function
        self.variable_count = 0

    def visit_Compound(self, node):
        self.generic_visit(node)

    def visit_Decl(self, node):
        if isinstance(node.init, cfg_node.FuncDef):
            # Function declarations are not counted as variables
            return
        self.variable_count += 1
        self.generic_visit(node)

    def visit_If(self, node):
        self.cyclomatic_complexity += 1
        self.generic_visit(node)

    def visit_TernaryOp(self, node):
        self.cyclomatic_complexity += 1
        self.generic_visit(node)

def calculate_metrics(filename):
    with open(filename, 'r') as file:
        c_code = file.read()
    myparser = parser.CParser()
    ast = myparser.parse(c_code)

    metric_visitor = MetricVisitor()
    metric_visitor.visit(ast)


    return {
        "NumberOfFunctions": len(metric_visitor.function_metrics),
        "NumberOfVariables": metric_visitor.variable_count,
        "NumberOfStatements": metric_visitor.statement_count,
        "FunctionMetrics": metric_visitor.function_metrics
    }
