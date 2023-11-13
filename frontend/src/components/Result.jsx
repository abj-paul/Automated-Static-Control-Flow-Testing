import React, { useState } from 'react';
import DataFlowTest from './DataFlowTest';
import { Route, Routes } from 'react-router-dom';
import HandleFileComponent from './HandleFileComponent';
import DataFlowComponentProject from './HandleDataFlowResultProject';

const Result = () => {
  const [postData, setPostData] = useState(null);
  const [isFilePath, setIsFile] = useState(null);

  const handlePostData = ({data, isFile}) => {
    console.log(data);
    setPostData(data);
    setIsFile(isFile);
  };

  return (
    <div>
      <DataFlowTest onPostData={handlePostData} />

      {postData && (
        <div>
          <Routes>
            <Route path="/handle-file" element={<HandleFileComponent functionData={postData.data} />} />
            <Route path="/data-flow-project" element={<DataFlowComponentProject functionData={postData.data} />} />
          </Routes>
        </div>
      )}
    </div>
  );
};

export default Result;