import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Input from './Input';
import Function from './Function';
import IndependentClass from './IndependentClass';
import ReactFlow from 'react-flow-renderer';

const DataFetcher = () => {
    const [inputdata, setInputData] = useState([]);
    const [functiondata, setFunctionData] = useState([]);
    const [elements, setElements] = useState([]);
    const columnStyle = {
      flex: '1',
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      marginRight: '10px',
    };
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('/func.json');
          const data = response.data;
          handleDataLoaded(data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, []);
  
    const handleDataLoaded = (data) => {
      if (data.asts) {
        setInputData(data.asts);
        setElements(data.asts);
      }
      if (data.functions) {
        setFunctionData(data.functions);
      }
    };
  
    return (
      <div className="App" style={{ display: 'flex' }}>
        <div style={columnStyle}>
          <h1>Control Flow Graph</h1>
          <ReactFlow elements={elements} />
        </div>
        <div style={columnStyle}>
          <h1>Function Code</h1>
          {functiondata.map((data) => (
            <Function key={data.id} functiondata={data} />
          ))}
        </div>
        <div style={columnStyle}>
          <h1>Write Dependent Path and corresponding test cases </h1>
          <IndependentClass />
        </div>
      </div>
    );
  };
  
  export default DataFetcher;