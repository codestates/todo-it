import React, { useState } from 'react';
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

function SideBar() {
  const [Directories, setDirectories] = useState<string[]>([
    'asdfsd',
    'wegwef',
    'Wgwfwe',
  ]);

  return (
    <Sidebar>
      {console.log(Directories)}
      <DirectoriyContainer>
        {Directories.map((name, index) => (
          <Directory
            key={index}
            name={name}
            Directories={Directories}
            setDirectories={setDirectories}
          />
        ))}
      </DirectoriyContainer>
      <AddDirectory
        Directories={Directories}
        setDirectories={(arr: string[]) => setDirectories(arr)}
      />
    </Sidebar>
  );
}

export default SideBar;
