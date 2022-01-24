import React, { useState } from "react";
import styled from "styled-components";
import Header from "../../components/Header/Header";
import {
  StyledDiv,
  KeyInput,
  ButtonBox,
  StyledButton
} from "../SignupPage/SignupPage"
import { UserLoginModal } from "./UserLoginModal";
import { WithdrawalModal } from "./WithdrawalModal";

const UserSettingPageContainer = styled.div`
  
`

const Body = styled.div`
  margin-top: 30vh;
`

export const Profile = () => {

  const [isLogin, setIsLogin] = useState(false)
  const [isWithdrawal, setIsWithdrawal] = useState(false)

  const LoginModalHandler = () => {
    setIsLogin(!isLogin)
  }

  const WithdrawalModalHandler = () => {
    setIsWithdrawal(!isWithdrawal)
  }

  return (
    <UserSettingPageContainer>
      {isLogin ? <UserLoginModal LoginModalHandler={LoginModalHandler}/> : ''}
      {isWithdrawal ? <WithdrawalModal WithdrawalModalHandler={WithdrawalModalHandler}/> : ''}
      <Header/>
      <Body>
        <StyledDiv>
          <KeyInput>닉네임 :</KeyInput>
          <KeyInput style={{paddingLeft: "0px"}}>MYMY{/* 요청 데이터 */}</KeyInput>
        </StyledDiv>
        <StyledDiv>
          <KeyInput>이메일 :</KeyInput>
          <KeyInput style={{paddingLeft: "0px"}}>alsqha2626@gmail.com{/* 요청 데이터 */}</KeyInput>
        </StyledDiv>
        <ButtonBox>
          <StyledButton>팀 관리</StyledButton>
          <StyledButton onClick={LoginModalHandler}>회원정보수정</StyledButton>
          <StyledButton onClick={WithdrawalModalHandler}>회원탈퇴</StyledButton>
        </ButtonBox>
      </Body>
    </UserSettingPageContainer>
  )
}