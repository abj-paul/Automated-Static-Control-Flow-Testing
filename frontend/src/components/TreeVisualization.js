import React, { useState, useEffect } from 'react';
import Tree from 'react-d3-tree';

const TreeVisualization = () => {
  const [treeData, setTreeData] = useState(null);

  useEffect(() => {
    const convertASTToTreeData = (node) => {
      const treeData = { 
        name: node._nodetype ,
        children: [],
        attributes: {}
      };

      if(node.coord){
        const coord = node.coord.split(':');
        const { file, line, column } = { file: coord[0], line: coord[1], column: coord[2] };
        treeData.attributes = { ...treeData.attributes, file, line, column };
      }

      if (node.name) {
        if(node.name._nodetype){
          treeData.children.push(convertASTToTreeData(node.name));
        } else treeData.attributes = { ...treeData.attributes, name: node.name };
      }

      if (node.declname) {
        treeData.attributes = { ...treeData.attributes, declname: node.declname };
      }

      if (node.names) {
        node.names.map((child) => treeData.attributes = { ...treeData.attributes, names: child });
      }

      if (node.type) {
        if(node.type._nodetype){
          treeData.children.push(convertASTToTreeData(node.type));
        }
        else treeData.attributes = { ...treeData.attributes, type: node.type };
      }

      if (node.value) {
        treeData.attributes = { ...treeData.attributes, value: node.value };
      }

      if(node.body){  
        treeData.children.push(convertASTToTreeData(node.body));
      }

      if(node.expr){
        console.log(node.expr);
        treeData.children.push(convertASTToTreeData(node.expr));
      }

      if(node.decl){
        treeData.children.push(convertASTToTreeData(node.decl));
      }

      if(node.block_items){
        node.block_items.map((child) => treeData.children.push(convertASTToTreeData(child)));
      }
      
      if (node.ext) {
        node.ext.map((child) => treeData.children.push(convertASTToTreeData(child)));
      }
  
      return treeData;
    };
    
    fetch('/astTest.json')
      .then((response) => response.json())
      .then((data) => {
        const treeData = convertASTToTreeData(data);
        setTreeData(treeData);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  

  return (
    <div style={{ width: '100%', height: '500px' }}>
      {treeData ? (
        // console.log(treeData),
        <Tree data={treeData} orientation="vertical" />
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default TreeVisualization;
