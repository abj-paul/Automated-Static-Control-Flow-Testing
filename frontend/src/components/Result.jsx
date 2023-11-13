// Result.jsx

import React, { useState } from 'react';
import DataFlowTest from './DataFlowTest';
import { Route, Routes } from 'react-router-dom';
import HandleFileComponent from './HandleFileComponent';
import DataFlowComponentProject from './HandleDataFlowResultProject';

const Result = () => {
  const [postData, setPostData] = useState(null);

  const handlePostData = (isFile) => {
    setPostData({ isFile }); // Store isFile in the postData state
  };

  return (
    <div>
      <DataFlowTest onPostData={handlePostData} />

      {postData && (
        <div>
          <Routes>
            <Route path="/handle-file" element={<HandleFileComponent functionData={postData} />} />
            <Route path="/data-flow-project" element={<DataFlowComponentProject functionData={postData} />} />
          </Routes>
        </div>
      )}
    </div>
  );
};

export default Result;
