import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './Result.css';

const DataFlowComponentProject = ({ resultLoaded }) => {
  return (
    <div>
      <p>Data Flow Testing: Project</p>
      {resultLoaded.filenames.map((filename, i) => (
        <div key={i} className="container">
          <h1>Filename: {filename}</h1>
          {resultLoaded.functions[i].map((functions, j) => (
            <div key={j} className="row">
              <div className="col-sm-5">
                <pre>{resultLoaded.functions[i][j]}</pre>
              </div>
              <div className="col-sm-7">
                <p>Data Flow Table</p>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Variable</th>
                      <th>DUK Pattern</th>
                      <th>Line Numbers</th>
                      <th>Comments</th>
                    </tr>
                  </thead>
                  <tbody>
                    {resultLoaded.data_flow_tables[i][j].map((row, k) => (
                      <tr key={k}>
                        <td>{row.variable}</td>
                        <td>{resultLoaded.data_flow_tables[i][j][k].data_flow_pattern}</td>
                        <td>{resultLoaded.data_flow_tables[i][j][k].lines}</td>
                        <td>
                          {['ud', 'kk', 'dk', 'ku'].includes(row.data_flow_pattern) ? (
                            <p>Risky code!</p>
                          ) : (
                            <p>Normal code</p>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default DataFlowComponentProject;