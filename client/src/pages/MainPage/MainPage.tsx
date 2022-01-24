import React from 'react';
import styled from 'styled-components';
import { Sidebar } from '../../components/Sidebar/Sidebar';
import Todos from '../../components/Todos/Todos';

const Container = styled.div`
  width: 100%;
  height: 95vh;
  overflow: hidden;
`;

function MainPage() {
  return (
    <Container>
      <Todos />
      <Sidebar />
    </Container>
  );
}

export default MainPage;