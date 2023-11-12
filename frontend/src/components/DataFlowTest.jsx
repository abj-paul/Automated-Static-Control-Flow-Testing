import React, { useState } from 'react';
import './DataFlow.css';
import ManualFileInputComponent from './InputFile';
import ProjectPathInputForm from './InputProject';
import DataFlowComponentProject from './HandleDataFlowResultProject';
import axios from 'axios';
import { Modal, Button, Container } from 'react-bootstrap';
import HandleFileComponent from './HandleFileComponent';

const DataFlowTest = () => {
  const [data, setData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isFilePath, setIsFilePath] = useState(false); // Declare isFilePath state

  const handleManualFileSubmit = async (filePath) => {
    try {
      const apiUrl = 'http://127.0.0.1:8000/api/v1/dataflow/code/file';
      const response = await axios.post(apiUrl, { code_url: filePath });

      setData(response.data);
      setIsFilePath(true); // Set isFilePath to true for file path
      setShowModal(true);
    } catch (error) {
      console.error('Error fetching data flow:', error);
    }
  };

  const handleProjectPathSubmit = async (projectPath) => {
    try {
      const apiUrl = 'http://localhost:8000/api/v1/dataflow/code/project';
      const response = await axios.post(apiUrl, { code_url: projectPath });

      setData(response.data);
      setIsFilePath(false); // Set isFilePath to false for project path
      setShowModal(true);
    } catch (error) {
      console.error('Error fetching data flow:', error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setIsFilePath(false); // Reset isFilePath when modal is closed
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
          {/* Check if the data source is a file path and send it to HandleFileComponent */}
          {isFilePath ? (
            <HandleFileComponent functionData={data} />
          ) : (
            <Modal show={showModal} onHide={handleCloseModal} size="lg">
              <Modal.Header closeButton>
                <Modal.Title>Data Flow Results</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Container fluid>
                  <DataFlowComponentProject functionData={data} />
                </Container>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          )}
        </div>
      )}
    </div>
  );
};

export default DataFlowTest;