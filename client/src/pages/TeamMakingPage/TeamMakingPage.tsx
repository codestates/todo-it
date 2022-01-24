import React, { useState } from "react";
import styled from "styled-components";
import { 
  StyledDiv,
  KeyInput,
  InputBox,
  ValueInput,
  ButtonBox,
  Warning
 } from "../SignupPage/SignupPage";

const TeamMakingPageContainer = styled.div`

`

const Body = styled.body`
  margin: 30vh;
`

const Btn = styled.div`
  display: flex;
  justify-content: center;
  background: red;
  width: 100px;
  height: 50px;
  align-items: center;
  cursor: pointer;
  border-radius: 5px;
  margin-left: 10px;
`

export const TeamMakingPage = () => {
  
  const [teamName, setTeamName] = useState('')
  const [isTeamName, setIsTeamName] = useState(true)

  const TeamNameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTeamName(event.target.value)
    const CheckTeamName = (teamName: string) => {
      return teamName.length >= 2 && teamName.length <= 14
    }
    if (CheckTeamName(event.target.value)) {
      setIsTeamName(true)
    }
    else {
      setIsTeamName(false)
    }
  }

  const TeamMakingButtonClickHandler = () => {
    // TODO: 팀 생성 요청 보내기
    console.log('팀 생성 요청 보내기')
  }

  return (
    <TeamMakingPageContainer>
      <Body>
        <StyledDiv>
          <KeyInput>팀 이름 :</KeyInput>
          <InputBox>
            <ValueInput type="text" placeholder="팀 이름" value={teamName} onChange={TeamNameHandler}/>
            <Warning style={isTeamName ? {display: "none"} : {}}>팀 이름은 2 ~ 14자 로 작성해 주시기 바랍니다.</Warning>
          </InputBox>
        </StyledDiv>
      </Body>
      <ButtonBox>
        <Btn onClick={TeamMakingButtonClickHandler}>팀 생성</Btn>
      </ButtonBox>
    </TeamMakingPageContainer>
  )
}