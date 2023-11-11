import React from 'react';
import './App.css';
import TreeVisualization from './components/TreeVisualization';
import FileInputComponent from './components/InputFile';
import ProjectPathInputForm from './components/InputProject';

function App() {
  const [response, setResponse] = React.useState(null);
  React.useEffect(() => {
    fetch('http://localhost:5000/')
      .then(res => res.json())
      .then(data => setResponse(data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="App">
      <FileInputComponent />
      <ProjectPathInputForm />
      <h1>Tree Visualization</h1>
      <TreeVisualization {...response} />
    </div>
  );
}

export default App;
