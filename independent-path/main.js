const apiUrl = 'http://localhost:8000/api/v1/code/file';

// JSON payload
const requestData = {
  code_url: './project-to-test/test.c',
};

// Use the fetch function to send a POST request
fetch(apiUrl, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json', // Set the content type to JSON
    // Add any other headers if needed
  },
  body: JSON.stringify(requestData), // Convert the payload to a JSON string
})
  .then(response => {
    // Check if the request was successful (status code 2xx)
    if (response.ok) {
      return response.json(); // Parse the JSON in the response
    } else {
      throw new Error('Request failed');
    }
  })
  .then(data => {
    // Handle the data from the response
    console.log('Response data:', data);
  })
  .catch(error => {
    // Handle errors
    console.error('Error:', error);
  });
