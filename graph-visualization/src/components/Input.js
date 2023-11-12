import React, { useState, useEffect } from 'react'
import Tree from 'react-d3-tree'

const Input = (inputdata) => {
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
   
    const data = convertASTToTreeData(inputdata.inputdata);
    setTreeData(data);
  }, [inputdata]);

  return (
    <div style={{ maxWidth: '450px', width: '100%', height: '300px', backgroundColor: 'rgba(0,0,0,0.1)', boxShadow: '0 0 10px rgba(0,0,0,0.2)', margin: '10px' }}>
      {treeData ? (
        // console.log(treeData),
        <Tree data={treeData} orientation="vertical" />
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  )
}

export default Input