// main.js

// Function to send a POST request
async function sendPostRequest(url, data) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    return await response.json();
}

// Function to perform DFS on the AST
function dfs(node, path = []) {
    if (!node) {
        return;
    }

    // Process the current node
    console.log(node._nodetype);

    // Update the path
    const newPath = [...path, node._nodetype];

    // Recursively explore child nodes
    if (node.ext) {
        for (const childNode of node.ext) {
            dfs(childNode, newPath);
        }
    } else if (node.block_items) {
        for (const childNode of node.block_items) {
            dfs(childNode, newPath);
        }
    }

    // Print the independent path when reaching the end of a branch
    if (!node.ext && !node.block_items) {
        console.log("Independent Path:", newPath.join(" -> "));
    }
}

// Function to handle the result
function handleResult(result) {
    const resultDiv = document.getElementById('result');

    // Display the result on the page
    resultDiv.innerText = JSON.stringify(result, null, 2);

    // Perform DFS on the AST
    const ast = result.asts[0];
    console.log(`DEBUG: ${ast}`)
    dfs(ast);
}

// Function to analyze AST
async function analyzeAST() {
    const apiUrl = 'http://localhost:8000/api/v1/code/file';
    const codeUrl = './project-to-test/paths.c';

    try {
        // Send POST request to the API
        const result = await sendPostRequest(apiUrl, { code_url: codeUrl });

        // Handle the result
        handleResult(result);
    } catch (error) {
        console.error('Error:', error);
    }
}

// Call the function to initiate the analysis
analyzeAST();
