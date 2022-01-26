import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
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

interface Iprops {
  userInfo: {
    id?: number;
    nickname?: string;
    email?: string;
  };
}

export const UserInfoSettingPage = ({ userInfo }: Iprops) => {
  const [name, setName] = useState('');
  const [isName, setIsName] = useState(true);
  const [newpassword, setNewPassword] = useState('');
  const [isPass, setIsPass] = useState(true);
  const [checkPass, setCheckPass] = useState('');
  const [isCheck, setIsCheck] = useState(true);
  const [originPassword, setOriginPassword] = useState('');

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

  const PasswordHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(event.target.value);

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

    if (newpassword === event.target.value || event.target.value.length === 0) {
      setIsCheck(true);
    } else {
      setIsCheck(false);
    }
  };

  const OriginPassHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOriginPassword(event.target.value);
  };

  const UserInfoSettingHandler = () => {
    axios
      .patch(
        'https://localhost:8000/users/me',
        {
          oldPassword: originPassword,
          nickname: name,
          newPassword: newpassword,
        },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res.data);
        window.location.href = 'https://localhost:3000/';
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <UserInfoSettingPageContainer>
      <Body>
        <StyledDiv>
          <KeyInput>닉네임 :</KeyInput>
          <InputBox>
            <ValueInput
              type="text"
              placeholder={userInfo.nickname}
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
            {userInfo.email}
          </KeyInput>
        </StyledDiv>
        <StyledDiv>
          <KeyInput>기존 비밀번호 :</KeyInput>
          <InputBox>
            <ValueInput
              type="password"
              value={originPassword}
              onChange={OriginPassHandler}
            />
          </InputBox>
        </StyledDiv>
        <StyledDiv>
          <KeyInput>비밀번호 :</KeyInput>
          <InputBox>
            <ValueInput
              type="password"
              value={newpassword}
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
          <StyledButton onClick={UserInfoSettingHandler}>
            정보 수정
          </StyledButton>
        </ButtonBox>
      </Body>
    </UserInfoSettingPageContainer>
  );
};
