import React, { useState } from 'react';
import styled from 'styled-components';
import {
  Body,
  StyledDiv,
  KeyInput,
  InputBox,
  ValueInput,
  Warning,
  ButtonBox,
  StyledButton,
} from '../SignupPage/SignupPage';

const UserInfoSettingPageContainer = styled.div`
  display: flex;
`;

export const UserInfoSettingPage = () => {
  const [name, setName] = useState('');
  const [isName, setIsName] = useState(true);
  const [email, setEmail] = useState('');
  const [isEmail, setIsEmail] = useState(true);
  const [password, setPassword] = useState('');
  const [isPass, setIsPass] = useState(true);
  const [checkPass, setCheckPass] = useState('');
  const [isCheck, setIsCheck] = useState(true);

  const NameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    const CheckId = (name: string): boolean => {
      return (name.length <= 14 && name.length >= 4) || name.length === 0;
    };
    if (!CheckId(event.target.value)) {
      setIsName(false);
    } else {
      setIsName(true);
    }
  };

  const EmailHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    const CheckEmail = (email: string): boolean => {
      return email.includes('@') || email.length === 0;
    };
    if (!CheckEmail(event.target.value)) {
      setIsEmail(false);
    } else {
      setIsEmail(true);
    }
  };

  const PasswordHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    const CheckPass = (password: string): boolean => {
      return (
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,128}$/.test(
          password
        ) || password.length === 0
      );
    };
    if (!CheckPass(event.target.value)) {
      setIsPass(false);
    } else {
      setIsPass(true);
    }
  };

  const CheckPassHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckPass(event.target.value);
    if (password === event.target.value || event.target.value.length === 0) {
      setIsCheck(true);
    } else {
      setIsCheck(false);
    }
  };

  const SignupClickHandler = () => {
    // TODO : signup 요청
    // if (200 ok) => window.location.href = localhost:3000/login
  };

  const verifyEmailHandler = () => {
    // TODO : email 인증 요청
  };

  return (
    <UserInfoSettingPageContainer>
      <Body>
        <StyledDiv>
          <KeyInput>닉네임 :</KeyInput>
          <InputBox>
            <ValueInput
              type="text"
              placeholder="user.name"
              value={name}
              onChange={NameHandler}
            />
            <Warning style={isName ? { display: 'none' } : {}}>
              닉네임은 4~14글자 입니다.
            </Warning>
          </InputBox>
        </StyledDiv>
        <StyledDiv>
          <KeyInput>이메일 :</KeyInput>
          <KeyInput
            style={{
              textAlign: 'center',
              paddingLeft: '0',
              paddingRight: '160px',
            }}
          >
            user.email
          </KeyInput>
        </StyledDiv>
        <StyledDiv>
          <KeyInput>비밀번호 :</KeyInput>
          <InputBox>
            <ValueInput
              type="password"
              value={password}
              onChange={PasswordHandler}
            />
            <Warning style={isPass ? { display: 'none' } : {}}>
              8 ~ 128자의 영문 대소문자, 숫자, 특수문자만 사용 가능합니다.
            </Warning>
          </InputBox>
        </StyledDiv>
        <StyledDiv>
          <KeyInput>비밀번호 확인 :</KeyInput>
          <InputBox>
            <ValueInput
              type="password"
              value={checkPass}
              onChange={CheckPassHandler}
            />
            <Warning style={isCheck ? { display: 'none' } : {}}>
              비밀번호가 일치하지 않습니다.
            </Warning>
          </InputBox>
        </StyledDiv>
        <ButtonBox>
          <StyledButton onClick={SignupClickHandler}>정보 수정</StyledButton>
        </ButtonBox>
      </Body>
    </UserInfoSettingPageContainer>
  );
};
