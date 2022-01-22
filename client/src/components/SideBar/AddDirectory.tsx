import React, { useState } from 'react';
import styled from 'styled-components';

const AddBtn = styled.div`
  background-color: #cccccc;
  height: 10vh;
  text-align: center;
  line-height: 4em;
  display: flex;
  justify-content: center;
`;

const AddListContainer = styled.div`
  background-color: #e6f3fc;
  height: 10vh;
  align-items: center;
  position: relative;
  display: flex;
  justify-content: center;
`;

const NameInput = styled.input`
  height: 40%;
`;

interface Props {
  Directories: Array<string>;
  setDirectories(arr: string[]): void;
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
    setDirectories([...Directories, directoryName]);
    setDirectoryName('');
    setClick(false);
  };

  return (
    <div>
      {!click ? (
        <AddBtn onClick={onClick}>+ New List</AddBtn>
      ) : (
        <AddListContainer>
          <NameInput onChange={onChange} value={directoryName} />
          <button onClick={AddDirectory}>+</button>
        </AddListContainer>
      )}
    </div>
  );
}

export default AddDirectory;
