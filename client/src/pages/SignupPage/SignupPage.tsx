import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const SignupContainer = styled.div`
  display: flex;
`;

export const Body = styled.div`
  margin: 15vh 0;
  height: 100%;
  width: 100%;
`;

export const StyledDiv = styled.div`
  display: flex;
  height: 50px;
  justify-content: center;
  margin-top: 5vh;
`;

export const KeyInput = styled.div`
  font-family: 'EliceDigitalBaeum_Bold';
  font-size: 18px;
  padding-left: 160px;
  width: 200px;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  justify-content: center;
`;

export const InputBox = styled.div`
  width: 360px;
`;

export const ValueInput = styled.input`
  font-family: 'EliceDigitalBaeum_Bold';
  border: none;
  box-shadow: -2px -2px 4px #f8f8f8, 3px 3px 6px rgb(184, 184, 184);
  border-radius: 13px;
  font-size: 17px;
  height: 40px;
  width: 230px;
  padding: 5px;
`;

// const VerifyButton = styled.button`
//   margin-left: 10px;
// `;

export const Warning = styled.div`
  font-family: 'IBMPlexSansKR-Light';
  font-size: smaller;
  font-weight: bolder;
  color: red;
`;

export const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
`;

export const StyledButton = styled.div`
  &:hover {
    background: #789278;
  }
  font-family: 'Y_Spotlight';
  box-shadow: 3px 3px 6px rgb(184, 184, 184);
  border: none;
  margin-top: 10vh;
  display: flex;
  justify-content: center;
  background: #708870;
  width: 100px;
  height: 50px;
  align-items: center;
  cursor: pointer;
  border-radius: 5px;
  margin-left: 10px;
  color: white;
`;

export const SignupPage = () => {
  const [name, setName] = useState('');
  const [isName, setIsName] = useState(true);
  const [email, setEmail] = useState('');
  const [isEmail, setIsEmail] = useState(true);
  const [password, setPassword] = useState('');
  const [isPass, setIsPass] = useState(true);
  const [checkPass, setCheckPass] = useState('');
  const [isCheck, setIsCheck] = useState(true);
  // const [isEmailVerified, setIsEmailVerified] = useState(false);

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
    if (password === event.target.value || password.length === 0) {
      setIsCheck(true);
    } else {
      setIsCheck(false);
    }
  };

  const SignupClickHandler = () => {
    // TODO : signup ??????
    // if (200 ok) => window.location.href = localhost:3000/login
    axios
      .post('https://localhost:8000/users', { email, password, nickname: name })
      .then((res) => {
        console.log(res.data);
        alert('??????????????? ?????????????????????.');
        window.location.href = './';
      })
      .catch((err) => {
        alert(err);
      });
  };

  // const verifyEmailHandler = () => {
  //   // TODO : email ?????? ??????
  // };

  return (
    <SignupContainer>
      <Body>
        <StyledDiv>
          <KeyInput>????????? :</KeyInput>
          <InputBox>
            <ValueInput
              type="text"
              placeholder="?????????"
              value={name}
              onChange={NameHandler}
            />
            <Warning style={isName ? { display: 'none' } : {}}>
              ???????????? 4~14?????? ?????????.
            </Warning>
          </InputBox>
        </StyledDiv>
        <StyledDiv>
          <KeyInput>????????? :</KeyInput>
          <InputBox>
            <ValueInput
              type="text"
              placeholder="?????????"
              value={email}
              onChange={EmailHandler}
            />
            {/* <VerifyButton>????????????</VerifyButton> */}
            <Warning style={isEmail ? { display: 'none' } : {}}>
              ????????? ???????????? ??????????????????.
            </Warning>
          </InputBox>
        </StyledDiv>
        <StyledDiv>
          <KeyInput>???????????? :</KeyInput>
          <InputBox>
            <ValueInput
              type="password"
              value={password}
              onChange={PasswordHandler}
            />
            <Warning style={isPass ? { display: 'none' } : {}}>
              8 ~ 128?????? ?????? ????????????, ??????, ??????????????? ?????? ???????????????.
            </Warning>
          </InputBox>
        </StyledDiv>
        <StyledDiv>
          <KeyInput>???????????? ?????? :</KeyInput>
          <InputBox>
            <ValueInput
              type="password"
              value={checkPass}
              onChange={CheckPassHandler}
            />
            <Warning style={isCheck ? { display: 'none' } : {}}>
              ??????????????? ???????????? ????????????.
            </Warning>
          </InputBox>
        </StyledDiv>
        <ButtonBox>
          <StyledButton onClick={SignupClickHandler}>????????????</StyledButton>
        </ButtonBox>
      </Body>
    </SignupContainer>
  );
};
