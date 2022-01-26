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
  directoryId: number;
  directory: string;
}

interface Props {
  userId?: number;
  directories: DirectoryListType[];
  setDirectories(arr: DirectoryListType[]): void;
  clickDirectory: string;
  DirectoryClicked(value: string): void;
}

function SideBar({
  userId,
  clickDirectory,
  DirectoryClicked,
  directories,
  setDirectories,
}: Props) {
  // const [rightBtnclick, setRightBtnClick] = useState(false);

  return (
    <Sidebar>
      <DirectoriyContainer>
        <div
          style={{ marginTop: '5px' }}
          onClick={() => DirectoryClicked('All')}
        >
          <Directory
            name="All"
            clickDirectory={clickDirectory}
            directories={directories}
            setDirectories={setDirectories}
          />
        </div>
        <div onClick={() => DirectoryClicked('Today')}>
          <Directory
            name="Today"
            clickDirectory={clickDirectory}
            directories={directories}
            setDirectories={setDirectories}
          ></Directory>
        </div>
        {directories.map((obj, index) => (
          <div key={index} onClick={() => DirectoryClicked(`${obj.directory}`)}>
            <Directory
              clickDirectory={clickDirectory}
              name={obj.directory}
              directories={directories}
              setDirectories={setDirectories}
            />
          </div>
        ))}
      </DirectoriyContainer>
      <AddDirectory
        Directories={directories}
        setDirectories={(arr: DirectoryListType[]) => setDirectories(arr)}
      />
    </Sidebar>
  );
}

export default SideBar;
