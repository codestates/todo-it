import React, { useState } from 'react';
import styled from 'styled-components';

const ModalContainer = styled.div`
  position: fixed;
  top: 10%;
  right: 2%;
  z-index: 10;
`;

const ModalContent = styled.div`
  color: black;
  width: 20rem;
  height: 30rem;
  background-color: #fff;
`;

const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.1);
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
`;
const Teams = styled.div`
  color: black;
  font-size: 24px;
`;

function TeamModal() {
  const contents = ['team1', 'team2', 'team3'];
  return (
    <div>
      <ModalContainer>
        <ModalContent>
          {contents.map((team) => {
            <Teams>team</Teams>;
          })}
        </ModalContent>
      </ModalContainer>
      <Overlay />
    </div>
  );
}

export default TeamModal;
