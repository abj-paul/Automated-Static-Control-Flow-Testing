import React from 'react';
import './App.css';
import TreeVisualization from './components/TreeVisualization';

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
      <h1>Tree Visualization</h1>
      <TreeVisualization {...response} />
    </div>
  );
}

export default App;
