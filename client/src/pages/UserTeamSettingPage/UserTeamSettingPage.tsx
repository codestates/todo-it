import React from "react";
import styled from 'styled-components';
import { Team } from "./Team";

const UserTeamSettingPageContainer = styled.div`
  
`

const StyledTitle = styled.div`
  text-align: center;
  margin: 10vh 0;
  font-size: large;
  font-weight: bold;
`

export const UserTeamSettingPage = () => {

  const teams = [
    {
      id: 1,
      name: 'team1'
    },
    {
      id: 2,
      name: 'team2'
    },
    {
      id: 3,
      name: 'team3'
    },
    {
      id: 4,
      name: 'team4'
    },
    {
      id: 5,
      name: 'team5'
    },
  ]

  return (
    <UserTeamSettingPageContainer>
      <StyledTitle>팀 목록</StyledTitle>
      {teams.map((obj) => {
        return <Team key={obj.id} id={obj.id} name={obj.name}/>
      })}
    </UserTeamSettingPageContainer>
  )
}