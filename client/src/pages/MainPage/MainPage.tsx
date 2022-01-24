import React from 'react';
import styled from 'styled-components';
import SideBar from '../../components/SideBar/SideBar';
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
      <SideBar />
    </Container>
  );
}

export default MainPage;
