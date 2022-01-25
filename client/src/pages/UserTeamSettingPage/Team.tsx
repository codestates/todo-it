import React from "react";
import styled from 'styled-components'

const TeamContainer = styled.div`
  display: flex;
  justify-content: center;
`

const TeamInfo = styled.div`
  display: flex;
  width: 70%;
  border: 1px solid #F9F9F9;
`

const TeamName = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`

const TeamBtn = styled.div`
  &:hover {
    color: black;
  }
  float: right;
  padding: 20px;
  width: 30px;
  height: 30px;
  color: rgba(0, 0, 0, 0);
`;

interface Iprops {
  id: number,
  name: string
}

export const Team = ({id, name}: Iprops) => {
  return (
    <TeamContainer>
      <TeamInfo>
        <TeamName>{name}</TeamName>
        <TeamBtn>...</TeamBtn>
      </TeamInfo>
    </TeamContainer>
  )
}