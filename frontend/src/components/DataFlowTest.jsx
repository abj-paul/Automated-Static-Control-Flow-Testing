import React, { useState } from 'react';
import './DataFlow.css';
import ManualFileInputComponent from './InputFile';
import ProjectPathInputForm from './InputProject';
import DataFlowComponentProject from './HandleDataFlowResultProject';
import axios from 'axios';
import { Modal, Button, Container } from 'react-bootstrap'; // Import react-bootstrap components

const DataFlowTest = () => {
  const [data, setData] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleManualFileSubmit = async (filePath) => {
    try {
      const apiUrl = 'http://127.0.0.1:8000/api/v1/dataflow/code/file';
      const response = await axios.post(apiUrl, { filePath });

      setData(response.data);
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
      setShowModal(true);
    } catch (error) {
      console.error('Error fetching data flow:', error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false); // Close the modal
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
          <Modal show={showModal} onHide={handleCloseModal} size="lg">
            <Modal.Header closeButton>
              <Modal.Title>Data Flow Results</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {/* Use Container component with fluid property to make it full-width */}
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
        </div>
      )}
    </div>
  );
};

export default DataFlowTest;