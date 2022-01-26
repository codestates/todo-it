import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../../fonts/font.css';
import styled from 'styled-components';
import axios from 'axios';

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
  border-radius: 20px;
  flex-direction: column;

  justify-content: space-around;
  background-color: #fff;
  box-shadow: 2px 2px 5px #b8b8b8, -1px -1px 3px #b8b8b8;
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
  &:hover {
    font-weight: bold;
    color: #3c553c;
    font-size: 18px;
  }
  font-family: 'Y_Spotlight';
  font-weight: normal;
  text-align: center;
  color: black;
`;

interface Props {
  userModal: boolean;
  setUserModal(value: boolean): void;
  LogoutHandler: () => void;
  email?: string;
}

function UserModal({ userModal, setUserModal, LogoutHandler, email }: Props) {
  const onClick = () => {
    setUserModal(!userModal);
  };

  const LogoutAxiosHandler = () => {
    axios
      .post('https://localhost:8000/auth/logout', null, {
        withCredentials: true,
      })
      .then(() => {
        setUserModal(false);
        LogoutHandler();
        window.location.href = 'https://localhost:3000/';
      })
      .catch((e) => alert(e));
  };

  return (
    <div>
      <ModalContainer>
        <ModalContent>
          <Btn>{email}</Btn>
          <NavLink to="/profile">
            <Btn onClick={onClick}>회원 정보 수정</Btn>
          </NavLink>
          <Btn onClick={LogoutAxiosHandler}>로그아웃</Btn>
        </ModalContent>
      </ModalContainer>
      <Overlay onClick={onClick} />
    </div>
  );
}

export default UserModal;
