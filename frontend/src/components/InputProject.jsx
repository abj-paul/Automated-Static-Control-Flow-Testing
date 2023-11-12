import React, { useState } from 'react';
import axios from 'axios';
import Button from './Button';
import './Input.css';

const ProjectPathInputForm = ({ onSubmit }) => {
  const [projectPath, setProjectPath] = useState('');

  const handleInputChange = (e) => {
    const inputPath = e.target.value;
    setProjectPath(inputPath);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(projectPath);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="projectPathInput">Enter C project path:</label><br />
        <input
          type="text"
          id="projectPathInput"
          value={projectPath}
          onChange={handleInputChange}
        /> <br />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default ProjectPathInputForm;