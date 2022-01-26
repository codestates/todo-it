import React, { useState } from 'react';
import styled from 'styled-components';
import {
  StyledDiv,
  KeyInput,
  InputBox,
  ValueInput,
  Body,
  ButtonBox,
  StyledButton,
  Warning,
} from '../SignupPage/SignupPage';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

const LoginContainer = styled.div``;

interface Iprops {
  LoginHandler: () => void;
}

export const LoginPage = ({ LoginHandler }: Iprops) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRight, setIsRight] = useState(true);

  const EmailHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const PasswordHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const LoginClickHandler = () => {
    // TODO : 로그인 요청 보내기
    axios
      .post(
        'https://localhost:8000/auth/login',
        { email, password },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res.data);
        LoginHandler();
      })
      .catch((err) => {
        console.log(err);
        setIsRight(false);
      });
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      LoginClickHandler();
    }
  };

  return (
    <LoginContainer>
      <Body style={{ marginTop: '30vh' }}>
        <StyledDiv>
          <KeyInput>이메일 :</KeyInput>
          <InputBox>
            <ValueInput
              type="text"
              placeholder="이메일"
              value={email}
              onChange={EmailHandler}
            />
          </InputBox>
        </StyledDiv>
        <StyledDiv>
          <KeyInput>비밀번호 :</KeyInput>
          <InputBox>
            <ValueInput
              type="password"
              value={password}
              onChange={PasswordHandler}
              onKeyUp={handleKeyPress}
            />
            <Warning style={isRight ? { display: 'none' } : {}}>
              잘못된 이메일 혹은 비밀번호 입니다.
            </Warning>
          </InputBox>
        </StyledDiv>
        <ButtonBox>
          {/* <StyledButton>비밀번호 찾기</StyledButton> */}
          <NavLink to="/signup">
            <StyledButton>회원가입</StyledButton>
          </NavLink>
          <StyledButton onClick={LoginClickHandler}>로그인</StyledButton>
        </ButtonBox>
      </Body>
    </LoginContainer>
  );
};
