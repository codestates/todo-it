import React from 'react';
import styled from 'styled-components';
import AddDirectory from './AddDirectory';
import Directory from './Directory';
import '../../fonts/font.css';

const Sidebar = styled.div`
  float: left;
  width: 30%;
  height: 100%;
  //display: table;
  display: flex;
  flex-direction: column;
  box-shadow: 2px 2px 5px #b8b8b8, -2px -2px 5px #ffffff;
`;
const DirectoriyContainer = styled.div`
  flex: 1;
  width: 100%;
  height: 92%;
  overflow-y: scroll;
  background-color: #fff;
  align-items: center;
`;

interface DirectoryListType {
  id: number;
  name: string;
}

interface Props {
  userId?: number;
  directories: DirectoryListType[];
  clickDirectory: number;
  DirectoryClicked(value: number): void;
}

function SideBar({
  userId,
  clickDirectory,
  DirectoryClicked,
  directories,
}: Props) {
  // const [rightBtnclick, setRightBtnClick] = useState(false);

  return (
    <Sidebar>
      <DirectoriyContainer>
        {directories.map((obj, index) => (
          <div key={index} onClick={() => DirectoryClicked(obj.id)}>
            <Directory
              clickDirectory={clickDirectory}
              id={obj.id}
              directories={directories}
              name={obj.name}
            />
          </div>
        ))}
      </DirectoriyContainer>
      <AddDirectory />
    </Sidebar>
  );
}

export default SideBar;
