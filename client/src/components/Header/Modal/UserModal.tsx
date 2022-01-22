import React, { useState } from 'react';
import styled from 'styled-components';

const ModalContainer = styled.div`
  position: fixed;
  top: 10%;
  right: 2%;
  z-index: 10;
`;

const ModalContent = styled.div`
  width: 20rem;
  height: 10rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
const Btn = styled.div`
  margin: 5px;
  text-align: center;
`;

interface Props {
  userModal: boolean;
  setUserModal(value: boolean): void;
}

function UserModal({ userModal, setUserModal }: Props) {
  const onClick = () => {
    setUserModal(!userModal);
  };

  return (
    <div>
      <ModalContainer>
        <ModalContent>
          <Btn>유저 정보</Btn>
          <Btn>회원 정보 수정</Btn>
          <Btn>로그아웃</Btn>
        </ModalContent>
      </ModalContainer>
      <Overlay onClick={onClick} />
    </div>
  );
}

export default UserModal;
