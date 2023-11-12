import React from 'react';
import './ControlFlow.css';
import ManualFileInputComponent from './InputFile';
import ProjectPathInputForm from './InputProject';

const ControlFlowTest = () => {
    return (
        <div className="divided-container">
          <div className="left-side">
            <h3>Test Single File Path</h3><br />
            <ManualFileInputComponent/>
          </div>
          <div className="right-side">
            <h3>Test Project Path</h3><br />
            <ProjectPathInputForm/>
          </div>
        </div>
      );
};

export default ControlFlowTest;