
   
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
  align-items: center;
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
  padding: 20px;
  font-size: 24px;
`;

interface Props {
  teamModal: boolean;
  setTeamModal(value: boolean): void;
}
function TeamModal({ teamModal, setTeamModal }: Props) {
  const contents = ['team1', 'team2', 'team3'];

  const onClick = () => {
    setTeamModal(!teamModal);
  };

  return (
    <div>
      <ModalContainer>
        <ModalContent>
          TEAM
          {contents.map((team, index) => (
            <Teams key={index}>{team}</Teams>
          ))}
        </ModalContent>
      </ModalContainer>
      <Overlay onClick={onClick} />
    </div>
  );
}

export default TeamModal;