import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LandingPage from './components/LandingPage';
import DataFlowTest from './components/DataFlowTest';
import ControlFlowTest from './components/ControlFlowTest';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/control-flow-testing" element={<ControlFlowTest />} />
          <Route path="/data-flow-testing/*" element={<DataFlowTest />} />
          <Route path="/result" element={<DataFlowTest />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;