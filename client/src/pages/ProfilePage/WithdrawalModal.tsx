import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const ModalBackdrop = styled.div`
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: grid;
  place-items: center;
`;

const ModalView = styled.div`
  background-color: #ffffff;
  width: 500px;
  height: 300px;

  > div.close_btn {
    background: red;
    cursor: pointer;
  }

  > div.desc {
    background-color: #fff;
    margin-top: 25px;
    color: red;
    font-weight: bold;
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
`;

const ValueBox = styled.div`
  width: 150px;
  display: flex;
  align-items: center;
`;

const InputBox = styled.input`
  width: 150px;
`;

interface Iprop {
  [index: string]: () => void;
}

export const WithdrawalModal = ({ WithdrawalModalHandler }: Iprop) => {
  const [password, setPassword] = useState('');

  const PasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const WithdrawalReq = () => {
    // TODO : 비밀번호 확인 요청 보내기
    // TODO : 회원 탈퇴 요청 보내기
    // TODO : 로그 아웃 요청 보내기 ??
    if (password !== '회원탈퇴') {
      WithdrawalModalHandler();
      return;
    }
    axios
      .delete('https://localhost:8000/users/me', {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      })
      .then(() => (window.location.href = 'https://localhost:3000/'))
      .catch((err) => console.log(err));
  };

  return (
    <ModalBackdrop onClick={WithdrawalModalHandler}>
      <ModalView onClick={(e) => e.stopPropagation()}>
        <div className="close-btn" onClick={WithdrawalModalHandler}>
          x
        </div>
        <div className="desc">회원님의 모든 정보가 삭제됩니다.</div>
        <div className="desc">정말로 탈퇴 하시겠습니까?</div>
        <div className="desc">탈퇴하시려면 회원탈퇴를 입력해주세요.</div>
        <StyledDiv>
          <InputBox
            onChange={PasswordHandler}
            value={password}
            type="text"
            placeholder="회원탈퇴"
          />
        </StyledDiv>
        <br />
        <div className="button" onClick={WithdrawalReq}>
          회원탈퇴
        </div>
      </ModalView>
    </ModalBackdrop>
  );
};
