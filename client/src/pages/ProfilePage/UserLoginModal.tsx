import React, { useState } from "react";
import styled from "styled-components";

const ModalBackdrop = styled.div`
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0,0,0,0.8);
  display: grid;
  place-items: center;
`;

const ModalView = styled.div`
    /* border-radius: 10px; */
    background-color: #ffffff;
    width: 500px;
    height: 300px;

    > div.close_btn {
      /* padding: 5px; */
      /* margin: 5px; */
      background: red;
      cursor: pointer;
    }

    > div.desc {
      background-color: #fff;
      margin-top: 25px;
      color: #4000c7;
      text-align: center;
    }
    > div.button {
      background: red;
      cursor: pointer;
      margin-right: 25px;
      width: 100px;
      height: 50px;
      margin-left: 70%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
`;

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  height: 5vh;
  margin-top: 20px;
`

const ValueBox = styled.div`
  width: 150px;
  display:flex;
  align-items: center;
`

const InputBox = styled.input`
  width: 150px;
`

interface Iprop {
  [index: string]: () => void;
}

export const UserLoginModal = ({LoginModalHandler}: Iprop) => {

  const [userId, setUserId] = useState('')
  const [password, setPassword] = useState('')

  const UserIdHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(event.target.value)
  }

  const PasswordHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  const LoginHandler = () => {
    // TODO: 로그인 요청 보내기
    // TODO: if ok => window.location.herf = localhost3000/
  }

  return (
    <ModalBackdrop onClick={LoginModalHandler}>
      <ModalView onClick={(e) => e.stopPropagation()}>
        <div className='close-btn' onClick={LoginModalHandler}>x</div>
        <div className='desc'>본인 확인을 위해 한번 더 로그인 해주세요.</div>
        <StyledDiv>
          <ValueBox>아이디 :</ValueBox>
          <InputBox onChange={UserIdHandler} type="text" placeholder="아이디" value={userId}/>
        </StyledDiv>
        <StyledDiv>
          <ValueBox>비밀번호 :</ValueBox>
          <InputBox onChange={PasswordHandler} type="password" value={password}/>
        </StyledDiv>
        <br/>
        <div className="button">로그인</div>
      </ModalView>
    </ModalBackdrop>
  )
}