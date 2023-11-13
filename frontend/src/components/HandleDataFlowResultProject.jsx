import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './Result.css';

const TableComponent = ({ table, index }) => {
  console.log(table);

  return (
    <div key={index} className="card table-card" style={{ marginBottom: '65vh' }}>
      <div className="card-body">
        <h5>Table {index + 1}</h5><br />
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Variable</th>
              <th>Data Flow Pattern</th>
              <th>Lines</th>
              <th>First Line</th>
              <th>Second Line</th>
            </tr>
          </thead>
          <tbody>
            {table.map((row, rowIndex) => (
              <tr key={rowIndex}>
                <td>{row.variable}</td>
                <td>{row.data_flow_pattern}</td>
                <td>{row.lines.join(', ')}</td>
                <td>{row.first_line}</td>
                <td>{row.second_line}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const FunctionDetailsComponent = ({ functionName, data }) => (
  <div className="card function-details-card" style={{ marginBottom: '20px' }}>
    <div className="card-body">
      <p>{functionName}</p>
      <div >
        {data && data.map((table, index) => (
          <TableComponent key={index} table={table} index={index} />
        ))}
      </div>
    </div>
  </div>
);

const DataFlowComponentProject = ({ functionData }) => {
  console.log(functionData);
  if (!functionData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container data-flow-container">
      {functionData.functions.map((func, index) => (
        <h2 key={index}>{func}</h2>
      ))}
      {functionData.filenames.map((func, index) => (
        <FunctionDetailsComponent key={index} functionName={func} data={functionData.data_flow_tables[index]} />
      ))}
    </div>
  );
};

export default DataFlowComponentProject;
