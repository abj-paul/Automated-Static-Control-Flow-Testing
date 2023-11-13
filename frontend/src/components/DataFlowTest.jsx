import React, { useState } from 'react';
import './DataFlow.css';
import ManualFileInputComponent from './InputFile';
import ProjectPathInputForm from './InputProject';
import axios from 'axios';

const DataFlowTest = ({ onPostData }) => {
  const [data, setData] = useState(null);
  const [isFilePath, setIsFilePath] = useState(false);

  const handleManualFileSubmit = async (filePath) => {
    try {
      const apiUrl = 'http://127.0.0.1:8000/api/v1/dataflow/code/file';
      const response = await axios.post(apiUrl, { code_url: filePath });

      setData(response.data);
      setIsFilePath(true);
      onPostData(response.data, isFilePath);
    } catch (error) {
      console.error('Error fetching data flow:', error);
    }
  };

  const handleProjectPathSubmit = async (projectPath) => {
    try {
      const apiUrl = 'http://localhost:8000/api/v1/dataflow/code/project';
      const response = await axios.post(apiUrl, { code_url: projectPath });

      setData(response.data);
      setIsFilePath(false);
      onPostData(response.data, isFilePath);
    } catch (error) {
      console.error('Error fetching data flow:', error);
    }
  };

  return (
    <div className="divided-container">
      <div className="left-side">
        <h3>Test Single File</h3><br />
        <ManualFileInputComponent onSubmit={handleManualFileSubmit} />
      </div>
      <div className="right-side">
        <h3>Test Project</h3><br />
        <ProjectPathInputForm onSubmit={handleProjectPathSubmit} />
      </div>
    </div>
  );
};

export default DataFlowTest;
