import React, { useState } from 'react';
import axios from 'axios';
import Button from './Button';
import './Input.css';

const ManualFileInputComponent = ({ onSubmit }) => {
  const [filePath, setFilePath] = useState('');

  const handleInputChange = (e) => {
    const inputPath = e.target.value;
    setFilePath(inputPath);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(filePath);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="manualFileInput">Enter .c file path:</label><br />
        <input
          type="text"
          id="manualFileInput"
          value={filePath}
          onChange={handleInputChange}
        /> <br />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default ManualFileInputComponent;
