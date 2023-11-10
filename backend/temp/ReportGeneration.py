import os
from graphviz import Digraph
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from pycparser import parse_file
import time
from wand.api import library
from wand.image import Image as WandImage

def generate_ast_graph(ast_node, dot, parent_name='', index=0):
    # Check if ast_node is a tuple and extract the actual AST node
    if isinstance(ast_node, tuple):
        ast_node = ast_node[0]

    current_name = f'{parent_name}_{index}' if parent_name else 'AST'
    dot.node(current_name, ast_node.__class__.__name__)

    # Check if ast_node has children attribute
    if hasattr(ast_node, 'children'):
        for i, child in enumerate(ast_node.children()):
            child_name = f'{current_name}_{i}'
            dot.edge(current_name, child_name)
            generate_ast_graph(child, dot, child_name, i)

def generate_pdf(ast_filename, pdf_filename):
    ast_tree = parse_file(ast_filename, use_cpp=True)

    # If the AST tree is wrapped in a tuple, extract the actual AST node
    if isinstance(ast_tree, tuple) and len(ast_tree) == 1:
        ast_tree = ast_tree[0]

    dot = Digraph(comment='AST Graph', format='pdf')
    generate_ast_graph(ast_tree, dot)

    dot.render(pdf_filename, cleanup=True)

    # Introduce a delay to ensure the file is available
    time.sleep(1)

    # Convert PDF to PNG using Wand
    png_filename = pdf_filename.replace('.pdf', '.png')

    with WandImage(filename=pdf_filename+".pdf", resolution=300) as img:
        img.convert("png")
        img.save(filename=png_filename)

    # Generate PDF documentation
    doc = canvas.Canvas(pdf_filename, pagesize=letter)
    doc.setFillColor(colors.black)
    doc.setFont("Helvetica", 12)
    doc.drawString(72, 800, "AST Documentation")

    # Add AST Graph PNG to PDF
    doc.drawInlineImage(png_filename, 72, 600, width=400, height=400)

    # Add more documentation as needed

    doc.save()

    # Remove temporary PNG file
    os.remove(png_filename)

if __name__ == '__main__':
    c_code_filename = '../project-to-test/test.c'
    output_pdf_filename = 'output_documentation'

    generate_pdf(c_code_filename, output_pdf_filename)

