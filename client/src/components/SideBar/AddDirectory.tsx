import React, { useState } from 'react';
import styled from 'styled-components';
import '../../fonts/font.css';

const AddListContainer = styled.div`
  background-color: #708870;
  height: 10vh;
  align-items: center;
  position: relative;
  display: flex;
  justify-content: center;
`;

const AddBtn = styled.div`
  &:hover {
    color: #202020;
  }
  font-family: 'EliceDigitalBaeum_Bold';
  color: gray;
  background-color: #eeeeee;
  height: 10vh;

  text-align: center;
  line-height: 65px;
  display: flex;
  justify-content: center;
  font-size: 20px;
`;

const NameInput = styled.input`
  all: unset;
  font-family: 'EliceDigitalBaeum_Bold';
  color: white;
  font-size: 20px;
  width: 60%;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 1px solid white;
`;
const SubmitBtn = styled.div`
  &:hover {
    color: #202020;
  }
  all: unset;
  font-family: 'EliceDigitalBaeum_Bold';
  color: #ffffff;
  font-size: 12px;
  padding: 5px;
`;

interface DirectoryListType {
  directoryId: number;
  directory: string;
}

interface Props {
  Directories: DirectoryListType[];
  setDirectories(arr: DirectoryListType[]): void;
}

function AddDirectory({ Directories, setDirectories }: Props) {
  const [click, setClick] = useState(false);
  const [directoryName, setDirectoryName] = useState('');

  const onClick = () => {
    setClick(true);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDirectoryName(value);
  };

  const AddDirectory = () => {
    const DirectoryId = Directories.length;
    let newDirectory = { directoryId: DirectoryId, directory: directoryName };
    setDirectories([...Directories, newDirectory]);
    setDirectoryName('');
    setClick(false);
  };

  const Cancel = () => {
    setClick(false);
  };

  return (
    <div>
      {!click ? (
        <AddBtn onClick={onClick}>+ New List</AddBtn>
      ) : (
        <AddListContainer>
          <NameInput onChange={onChange} value={directoryName} />
          <SubmitBtn onClick={AddDirectory}>추가</SubmitBtn>
          <SubmitBtn onClick={Cancel}>취소</SubmitBtn>
        </AddListContainer>
      )}
    </div>
  );
}

export default AddDirectory;
