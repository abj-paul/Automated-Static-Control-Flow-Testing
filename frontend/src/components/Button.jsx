import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  /* Your styling goes here */
  background-color: #3498db;
  color: #fff;
  font-size: 16px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #2980b9;
  }
`;

const Button = ({ onClick, children }) => {
  return <StyledButton onClick={onClick}>{children}</StyledButton>;
};

export default Button;
