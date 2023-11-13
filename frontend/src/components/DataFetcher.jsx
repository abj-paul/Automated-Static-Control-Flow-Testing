import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Function from './Function';
import IndependentClass from './IndependentClass';

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
    if (data.ext) {
      setInputData(data.ext);
      const graphElements = convertDataToElements(data.ext);
      setElements(graphElements);
    }
    if (data.functions) {
      setFunctionData(data.functions);
    }
  };

  const convertDataToElements = (data) => {
    const elements = [];

    // Create nodes
    data.forEach((item, index) => {
      if (item._nodetype === 'FuncDef') {
        elements.push({ id: item.decl.name, type: 'function' });
      }
    });

    // Create edges
    data.forEach((item) => {
      if (item._nodetype === 'FuncDef' && item.body.block_items) {
        item.body.block_items.forEach((blockItem) => {
          if (blockItem._nodetype === 'FuncCall') {
            elements.push({ id: `${item.decl.name}-${blockItem.name.name}`, source: item.decl.name, target: blockItem.name.name });
          }
        });
      }
    });

    return elements;
  };

  return (
    <div className="App" style={{ display: 'flex' }}>
      {/* <div style={columnStyle}>
        <h1>Control Flow Graph</h1>
        <svg width="600" height="400">
          {elements.map((element) => {
            if (element.type === 'function') {
              return (
                <rect
                  key={element.id}
                  x={elements.indexOf(element) * 100}
                  y={0}
                  width="80"
                  height="40"
                  fill="#79C7E3"
                />
              );
            } else {
              return (
                <line
                  key={element.id}
                  x1={elements.indexOf(element) * 100 + 40}
                  y1={20}
                  x2={elements.findIndex((e) => e.id === element.target) * 100 + 40}
                  y2={60}
                  stroke="#000"
                />
              );
            }
          })}
        </svg>
      </div> */}
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
