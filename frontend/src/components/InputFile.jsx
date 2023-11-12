import React, { useState } from 'react';
import axios from 'axios';
import Button from './Button';
import './Input.css';

const ManualFileInputComponent = () => {
  const [filePath, setFilePath] = useState('');

  const handleInputChange = (e) => {
    const inputPath = e.target.value;
    setFilePath(inputPath);
  };

  return (
    <div className="container">
      <label htmlFor="manualFileInput">Enter .c file path:</label><br />
      <input
        type="text"
        id="manualFileInput"
        value={filePath}
        onChange={handleInputChange}
      /> <br />
      <Button>Submit</Button>
    </div>
  );
};

export default ManualFileInputComponent;