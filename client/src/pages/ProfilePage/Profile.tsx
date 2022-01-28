import React, { useState } from 'react';
import styled from 'styled-components';
import {
  StyledDiv,
  KeyInput,
  ButtonBox,
  StyledButton,
} from '../SignupPage/SignupPage';
import { UserLoginModal } from './UserLoginModal';
import { WithdrawalModal } from './WithdrawalModal';
import { NavLink } from 'react-router-dom';

const UserSettingPageContainer = styled.div``;

const Body = styled.div`
  margin-top: 30vh;
`;

interface Iprops {
  userInfo: {
    id?: number;
    nickname?: string;
    email?: string;
  };
}

export const Profile = ({ userInfo }: Iprops) => {
  const [isLogin, setIsLogin] = useState(false);
  const [isWithdrawal, setIsWithdrawal] = useState(false);

  const LoginModalHandler = () => {
    setIsLogin(!isLogin);
  };

  const WithdrawalModalHandler = () => {
    setIsWithdrawal(!isWithdrawal);
  };

  return (
    <UserSettingPageContainer>
      {isWithdrawal ? (
        <WithdrawalModal WithdrawalModalHandler={WithdrawalModalHandler} />
      ) : (
        ''
      )}
      <Body>
        <StyledDiv>
          <KeyInput>닉네임 :</KeyInput>
          <KeyInput style={{ paddingLeft: '0px' }}>
            {userInfo.nickname}
          </KeyInput>
        </StyledDiv>
        <StyledDiv>
          <KeyInput>이메일 :</KeyInput>
          <KeyInput style={{ paddingLeft: '0px' }}>{userInfo.email}</KeyInput>
        </StyledDiv>
        <ButtonBox>
          <NavLink to="/userinfosetting">
            <StyledButton onClick={LoginModalHandler}>
              회원정보수정
            </StyledButton>
          </NavLink>
          <StyledButton onClick={WithdrawalModalHandler}>회원탈퇴</StyledButton>
        </ButtonBox>
      </Body>
    </UserSettingPageContainer>
  );
};
