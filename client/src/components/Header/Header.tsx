import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
// import MainPage from '../../pages/MainPage/MainPage';
import logo from './header_logo.png';
import TeamModal from './Modal/TeamModal';
import UserModal from './Modal/UserModal';
const Container = styled.div`
  background-color: #fff;
  position: fixed;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  top: 0;
  left: 0;
  line-height: 50px;
  text-align: center;
  box-shadow: 2px 2px 5px #b8b8b8, -2px -2px 5px #ffffff;
`;

const Logo = styled.img`
  height: 40px;
  margin-left: 20px;
`;

const Username = styled.button`
  all: unset;
  height: 70%;
  width: auto;
  padding: 3px;
  box-shadow: 2px 2px 5px #b8b8b8, -2px -2px 5px #ffffff;
`;

const Teambtn = styled.button`
  all: unset;
  height: 70%;
  width: 40px;
  padding: 3px;
  box-shadow: 2px 2px 5px #b8b8b8, -2px -2px 5px #ffffff;
`;

const BtnContainer = styled.div`
  margin-top: 5px;
  width: 10rem;
  display: flex;
  justify-content: space-between;
  margin-right: 20px;
  line-height: 30px;
`;

function Header() {
  const username = 'user';

  const [teamModal, setTeamModal] = useState<boolean>(false);
  const [userModal, setUserModal] = useState<boolean>(false);

  function TeamOpen() {
    setTeamModal(!teamModal);
  }
  function UserOpen() {
    setUserModal(!userModal);
  }

  return (
    <div>
      {teamModal ? (
        <TeamModal teamModal={teamModal} setTeamModal={setTeamModal} />
      ) : null}
      {userModal ? (
        <UserModal userModal={userModal} setUserModal={setUserModal} />
      ) : null}
      <Container>
        <NavLink to="/">
          <Logo src={logo}></Logo>
        </NavLink>
        <BtnContainer>
          <Teambtn onClick={TeamOpen}>T</Teambtn>
          <Username onClick={UserOpen}>{username}</Username>
        </BtnContainer>
      </Container>
    </div>
  );
}

export default Header;
