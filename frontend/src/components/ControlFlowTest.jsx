import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ControlFlow.css';
import ManualFileInputComponent from './InputFile';
import ProjectPathInputForm from './InputProject';
import DataFetcher from './DataFetcher';

const ControlFlowTest = () => {
  const [data, setData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isFilePath, setIsFilePath] = useState(false);

  const handleManualFileSubmit = async (filePath) => {
    try {
      const apiUrl = 'http://127.0.0.1:8000/api/v1/code/file';
      const response = await axios.post(apiUrl, { code_url: filePath });

      setData(response.data);
      setIsFilePath(true);
      setShowModal(true);
    } catch (error) {
      console.error('Error fetching data flow:', error);
    }
  };

  const handleProjectPathSubmit = async (projectPath) => {
    try {
      const apiUrl = 'http://localhost:8000/api/v1/code/project';
      const response = await axios.post(apiUrl, { code_url: projectPath });

      setData(response.data);
      setIsFilePath(false);
      setShowModal(true);
    } catch (error) {
      console.error('Error fetching data flow:', error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setIsFilePath(false);
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
      {data && (
        <div className="result-container">
          <DataFetcher functiondata={data} />
        </div>
      )}
    </div>
  );
};

export default ControlFlowTest;
