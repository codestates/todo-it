import React from 'react';
import styled from 'styled-components';
import AddDirectory from './AddDirectory';
import Directory from './Directory';
const Sidebar = styled.div`
  float: left;
  width: 30%;
  height: 100%;
  overflow-y: scroll;

  display: table;
  box-shadow: 2px 2px 5px #b8b8b8, -2px -2px 5px #ffffff;
`;
const DirectoriyContainer = styled.div`
  background-color: #fff;
  align-items: center;
`;

interface Props {
  directories: string[];
  setDirectories(arr: string[]): void;
}

function SideBar({ directories, setDirectories }: Props) {
  return (
    <Sidebar>
      {console.log(directories)}
      <DirectoriyContainer>
        {directories.map((name, index) => (
          <Directory
            key={index}
            name={name}
            directories={directories}
            setDirectories={setDirectories}
          />
        ))}
      </DirectoriyContainer>
      <AddDirectory
        Directories={directories}
        setDirectories={(arr: string[]) => setDirectories(arr)}
      />
    </Sidebar>
  );
}

export default SideBar;
