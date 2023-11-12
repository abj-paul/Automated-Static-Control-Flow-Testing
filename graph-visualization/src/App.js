import React, { useEffect , useState} from 'react';
import './App.css';
import Input from './components/Input';
import Function from './components/Function';
import IndependentClass from './components/IndependentClass';

function App() {
  const [inputdata, setInputData] = useState([]);
  const [functiondata, setFunctionData] = useState([]);
  const columnStyle = {
    flex: '1', 
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    marginRight: '10px', 
  };

  useEffect(() => {
    const extractdata = (data) => {
      if(data.asts){
        setInputData(data.asts);
      }
      if(data.functions){
        setFunctionData(data.functions);
      }
    }
    const apiUrl = 'http://localhost:8000/api/v1/code/file';

    const requestData = {
      code_url: './project-to-test/paths.c'
    };
    
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add any other headers if needed
      },
      body: JSON.stringify(requestData),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
          fetch(data.asts[0])
            .then((response) => response.json())
            .then((data) => {
              extractdata(data);
            })
            .catch((error) => console.error('Error fetching data:', error));
        },[]);
        return (
          <div className="App" style={{ display: 'flex' }}>
            <div style={columnStyle}>
              <h1>Control FLow Graph</h1>
              {inputdata.map((data) => (
                <Input inputdata={data}/>
              ))
              }
            </div>
            <div style={columnStyle}>
              <h1>Function Code</h1>
              {functiondata.map((data) => (
                <Function functiondata={data}/>
              ))
              }
            </div>
            <div style={columnStyle}>
              <h1>Write Dependedent Path and corresponding test cases </h1>
              <IndependentClass />
            </div>
          </div>
        );
        console.log(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
    
}

export default App;
