import React, { useState } from 'react';
import './DataFlow.css';
import ManualFileInputComponent from './InputFile';
import ProjectPathInputForm from './InputProject';
import axios from 'axios';
import { Route, Routes, Navigate } from 'react-router-dom';
import HandleFileComponent from './HandleFileComponent';
import DataFlowComponentProject from './HandleDataFlowResultProject';

const DataFlowTest = () => {
  const [data, setData] = useState(null);
  const [isFilePath, setIsFilePath] = useState(false);

  const handleManualFileSubmit = async (filePath) => {
    try {
      const apiUrl = 'http://127.0.0.1:8000/api/v1/dataflow/code/file';
      const response = await axios.post(apiUrl, { code_url: filePath });

      setData(response.data);
      setIsFilePath(true);
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
      console.log(isFilePath);
    } catch (error) {
      console.error('Error fetching data flow:', error);
    }
  };

  console.log('Data:', data, isFilePath);

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
          <Routes>
            <Route path="/handle-file" element={<HandleFileComponent functionData={data} />} />
            <Route path="/data-flow-project" element={<DataFlowComponentProject functionData={data} />} />
          </Routes>
          <Navigate to={isFilePath ? '/data-flow-testing/handle-file' : '/data-flow-testing/data-flow-project'} />
        </div>
      )}
    </div>
  );
};

export default DataFlowTest;


// DataFlowTest.jsx

// import React from 'react';
// import './DataFlow.css';
// import ManualFileInputComponent from './InputFile';
// import ProjectPathInputForm from './InputProject';
// import axios from 'axios';

// const DataFlowTest = ({ onPostData }) => {
//   const handleManualFileSubmit = async (filePath) => {
//     try {
//       const apiUrl = 'http://127.0.0.1:8000/api/v1/dataflow/code/file';
//       const response = await axios.post(apiUrl, { code_url: filePath });

//       onPostData(true); // Pass true directly instead of using isFilePath state
//     } catch (error) {
//       console.error('Error fetching data flow:', error);
//     }
//   };

//   const handleProjectPathSubmit = async (projectPath) => {
//     try {
//       const apiUrl = 'http://localhost:8000/api/v1/dataflow/code/project';
//       const response = await axios.post(apiUrl, { code_url: projectPath });

//       onPostData(false); // Pass false directly instead of using isFilePath state
//     } catch (error) {
//       console.error('Error fetching data flow:', error);
//     }
//   };

//   return (
//     <div className="divided-container">
//       <div className="left-side">
//         <h3>Test Single File</h3><br />
//         <ManualFileInputComponent onSubmit={handleManualFileSubmit} />
//       </div>
//       <div className="right-side">
//         <h3>Test Project</h3><br />
//         <ProjectPathInputForm onSubmit={handleProjectPathSubmit} />
//       </div>
//     </div>
//   );
// };

// export default DataFlowTest;
