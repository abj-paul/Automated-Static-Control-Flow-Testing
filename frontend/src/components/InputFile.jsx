import React, { useState } from 'react';
import axios from 'axios';

const ManualFileInputComponent = () => {
  const [filePath, setFilePath] = useState('');

  const handleInputChange = (e) => {
    const inputPath = e.target.value;
    setFilePath(inputPath);
  };

  const handleFileSubmit = () => {
    if (filePath.endsWith('.c')) {
      const apiUrl = 'http://localhost:8080/api/v1/code/file'; 
      axios.post(apiUrl, { filePath })
        .then(response => {
          console.log('File path sent successfully:', filePath);
          console.log('Server response:', response.data);
        })
        .catch(error => {
          console.error('Error sending file path:', error);
        });
    } else {
      alert('Please enter a valid .c file path');
    }
  };

  return (
    <div>
      <label htmlFor="manualFileInput">Enter .c file path:</label>
      <input
        type="text"
        id="manualFileInput"
        value={filePath}
        onChange={handleInputChange}
      />
      <button onClick={handleFileSubmit}>Submit</button>
    </div>
  );
};

export default ManualFileInputComponent;