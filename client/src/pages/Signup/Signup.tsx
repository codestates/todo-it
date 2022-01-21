import React, { useState } from "react";
import styled from "styled-components";
import { Header } from '../../components/Header/Header'

const SignupContainer = styled.div`
  
`

export const Body = styled.body`
  margin: 15vh 0 0 0 ;
`

export const StyledDiv = styled.div`
  display: flex;
  height: 50px;
  justify-content: center;
  margin-top: 5vh;
`

export const KeyInput = styled.div`
  padding-left: 160px;
  width: 200px;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  justify-content: center;
`

export const InputBox = styled.div`
  width: 360px;
`

export const ValueInput = styled.input`
  height: 40px;
  width: 200px;
`

const VerifyButton = styled.button`
  margin-left: 10px;
`

const Warning = styled.div`
  font-size: smaller;
  font-weight: bolder;
  color: red;
`

export const ButtonBox = styled.div`
  display: flex;
  justify-content: right;
  margin-right: 30vw;
`

export const StyledButton = styled.div`
  margin-top: 10vh;
  display: flex;
  justify-content: center;
  background: red;
  width: 100px;
  height: 50px;
  align-items: center;
  cursor: pointer;
  border-radius: 5px;
  margin-left: 10px
`

export const Signup = () => {

  const [name, setName] = useState('')
  const [isName, setIsName] = useState(true)
  const [email, setEmail] = useState('')
  const [isEmail, setIsEmail] = useState(true)
  const [password, setPassword] = useState('')
  const [isPass, setIsPass] = useState(true)
  const [checkPass, setCheckPass] = useState('')
  const [isCheck, setIsCheck] = useState(true)

  const NameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
    const CheckId = (name: string):boolean => {
      return (name.length <= 14 && name.length >= 4) || name.length === 0
    }
    if (!CheckId(event.target.value)) {
      setIsName(false)
    }
    else {
      setIsName(true)
    }
  }

  const EmailHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
    const CheckEmail = (email: string):boolean => {
      return email.includes('@') || email.length === 0
    }
    if (!CheckEmail(event.target.value)) {
      setIsEmail(false)
    }
    else {
      setIsEmail(true)
    }
  }

  const PasswordHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
    const CheckPass = (password: string):boolean => {
      return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,128}$/.test(password)
    }
    if (!CheckPass(event.target.value)) {
      setIsPass(false)
    }
    else {
      setIsPass(true)
    }
  }

  const CheckPassHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckPass(event.target.value)
    if (password === event.target.value) {
      setIsCheck(true)
    }
    else {
      setIsCheck(false)
    }
  }

  const SignupClickHandler = () => {
    // TODO : signup 요청
  }

  const verifyEmailHandler = () => {
    // TODO : email 인증 요청
  }

  return (
    <SignupContainer>
      <Header/>
      <Body>
        <StyledDiv>
          <KeyInput>닉네임 :</KeyInput>
          <InputBox>
            <ValueInput type="text" placeholder="닉네임" value={name} onChange={NameHandler}/>
            <Warning style={isName ? {display: "none"} : {}}>닉네임은 4~14글자 입니다.</Warning>
          </InputBox>
        </StyledDiv>
        <StyledDiv>
          <KeyInput>이메일 :</KeyInput>
          <InputBox>
            <ValueInput type="text" placeholder="이메일" value={email} onChange={EmailHandler}/>
            <VerifyButton>인증하기</VerifyButton>
            <Warning style={isEmail ? {display: "none"} : {}}>이메일 형식으로 입력해주세요.</Warning>
          </InputBox>
        </StyledDiv>
        <StyledDiv>
          <KeyInput>비밀번호 :</KeyInput>
          <InputBox>
            <ValueInput type="password" value={password} onChange={PasswordHandler}/>
            <Warning style={isPass ? {display: "none"} : {}}>8 ~ 128자의 영문 대소문자, 숫자, 특수문자만 사용 가능합니다.</Warning>
          </InputBox>
        </StyledDiv>
        <StyledDiv>
          <KeyInput>비밀번호 확인 :</KeyInput>
          <InputBox>
            <ValueInput type="password" value={checkPass} onChange={CheckPassHandler}/> 
            <Warning style={isCheck ? {display:"none"} : {}}>비밀번호가 일치하지 않습니다.</Warning>
          </InputBox>
        </StyledDiv>
        <ButtonBox>
          <StyledButton onClick={SignupClickHandler}>회원가입</StyledButton>
        </ButtonBox>
      </Body>
    </SignupContainer>
  )
}