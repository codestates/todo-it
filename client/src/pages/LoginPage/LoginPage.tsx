import React, { useState } from "react";
import styled from "styled-components";
import Header from "../../components/Header/Header";
import {
  StyledDiv,
  KeyInput,
  InputBox,
  ValueInput,
  Body,
  ButtonBox,
  StyledButton
} from "../SignupPage/SignupPage"

const LoginContainer = styled.div`
  
`

export const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const EmailHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }

  const PasswordHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  const LoginClickHandler = () => {
    // TODO : 로그인 요청 보내기
  }
  
  return (
    <LoginContainer>
      <Header/>
      <Body style={{marginTop: "30vh"}}>
        <StyledDiv>
          <KeyInput>이메일 :</KeyInput>
          <InputBox>
            <ValueInput type="text" placeholder="이메일" value={email} onChange={EmailHandler}/>
          </InputBox>
        </StyledDiv>
        <StyledDiv>
          <KeyInput>비밀번호 :</KeyInput>
          <InputBox>
            <ValueInput type="password" value={password} onChange={PasswordHandler}/>
          </InputBox>
        </StyledDiv>
        <ButtonBox>
          <StyledButton>비밀번호 찾기</StyledButton>
          <StyledButton>회원가입</StyledButton>
          <StyledButton onClick={LoginClickHandler}>로그인</StyledButton>
        </ButtonBox>
      </Body>
    </LoginContainer>
    // TODO: react-router-dom LINK
  )
}