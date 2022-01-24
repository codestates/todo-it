import React from 'react';
import styled from 'styled-components';

const TodosContainer = styled.div`
  float: right;
  width: 70%;
  height: 100%;
  overflow-y: scroll;
  box-shadow: 2px 2px 5px #b8b8b8, -2px -2px 5px #ffffff;
`;

function Todos() {
  return <TodosContainer></TodosContainer>;
}

export default Todos;
