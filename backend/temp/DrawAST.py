from pycparser import c_parser, c_ast
import networkx as nx
from PIL import Image
import matplotlib.pyplot as plt

def draw_ast(c_code, output_file='ast.png'):
    # Parse the C code to get the AST
    parser = c_parser.CParser()
    ast = parser.parse(c_code)

    # Create a directed graph
    graph = nx.DiGraph()

    # Helper function to recursively add nodes and edges to the graph
    def add_nodes_edges(node, parent_name=None):
        # Extract node information for label
        node_type = node.__class__.__name__
        if isinstance(node, c_ast.ID):
            label = f"{node_type}\n{node.name}"
        elif isinstance(node, c_ast.Constant):
            label = f"{node_type}\n{node.value}"
        else:
            label = node_type

        current_node_name = label + "\n" + str(node.coord)

        graph.add_node(current_node_name)

        if parent_name:
            # Add an edge from the parent to the current node
            graph.add_edge(parent_name, current_node_name)

        # Recursively add nodes and edges for children
        for child_name, child in node.children():
            add_nodes_edges(child, current_node_name)

    # Add nodes and edges starting from the AST root
    add_nodes_edges(ast)

    # Generate the image file
    pos = nx.drawing.nx_agraph.graphviz_layout(graph, prog='dot')  # Use 'dot' layout for a tree-like structure

    # Create a figure and axis without displaying it
    fig, ax = plt.subplots(figsize=(8, 8))
    ax.set_axis_off()

    # Draw the graph onto the figure
    nx.draw(graph, pos, with_labels=True, node_size=700, node_color='skyblue', font_size=8, ax=ax)

    # Save the image using Pillow
    fig.savefig(output_file, format="PNG", bbox_inches='tight', pad_inches=0.1)
    plt.close(fig)  # Close the Matplotlib figure

    print(f"AST image saved as {output_file}")
