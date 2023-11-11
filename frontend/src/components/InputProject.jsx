import React, { useState } from 'react';
import axios from 'axios';

const ProjectPathInputForm = () => {
  const [projectPath, setProjectPath] = useState('');

  const handleInputChange = (e) => {
    const inputPath = e.target.value;
    setProjectPath(inputPath);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (projectPath.trim() !== '') {
      const apiUrl = 'http://localhost:8080/api/v1/code/project'; 
      axios.post(apiUrl, { projectPath })
        .then(response => {
          console.log('Project path:', projectPath);
          console.log('Response:', response.data);
        })
        .catch(error => {
          console.error('Error sending project path:', error);
        });
    } else {
      alert('Please enter a valid project path');
    }
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="projectPathInput">Enter C project path:</label>
        <input
          type="text"
          id="projectPathInput"
          value={projectPath}
          onChange={handleInputChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ProjectPathInputForm;