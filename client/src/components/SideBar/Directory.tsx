import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  height: 70px;
  width: 95%;
  background-color: #e4eaff;
  margin: 3px;
`;

const Name = styled.div`
  float: left;
  padding: 20px;
`;

const DirectoryBtn = styled.div`
  &:hover {
    color: black;
  }
  float: right;
  padding: 20px;
  width: 30px;
  height: 30px;
  color: rgba(0, 0, 0, 0);
`;

const Modal = styled.div`
  height: 70px;
  width: 95%;
  margin: 3px;
  display: flex;
  justify-content: space-between;
  background-color: #ffefef;
`;

const Delete = styled.div`
  /* margin-right: 30%;
  padding: 20%; */
`;

const Edit = styled.div`
  /* margin-left: 30%;
  padding: 20%; */
`;

const EditDelteBtnContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const EditBox = styled.div``;

const EditInput = styled.input``;

const DelBox = styled.div``;

const DelBtn = styled.div``;

interface Props {
  name: string;
  Directories: Array<string>;
  setDirectories(arr: string[]): void;
}

function Directory({ name, Directories, setDirectories }: Props) {
  const [click, setClick] = useState(false);
  const [edit, setEdit] = useState(false);
  const [del, setDel] = useState(false);
  const [newName, setnewName] = useState('');

  const DirectoryRightBtnClick = () => {
    setClick(!click);
  };

  const EditClick = () => {
    setEdit(true);
  };
  const DeleteClick = () => {
    setDel(true);
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setnewName(value);
  };

  const EditBtnFunc = () => {
    setEdit(false);
    let directories = [...Directories];
    for (let i = 0; i < directories.length; i++) {
      if (directories[i] === name) {
        directories = directories.slice(0, i).concat([newName]);
        directories.concat(directories.slice(i + 1));
        break;
      }
    }
    // directories.map((directoryname, index) => {
    //   return directoryname === name ? (directoryname = newName) : true;
    // });
    setDirectories(directories);
    setClick(false);
  };

  const DelBtnFunc = () => {
    setDel(false);
    let directories = [...Directories];
    for (let i = 0; i < directories.length; i++) {
      if (directories[i] === name) {
        directories = directories.slice(0, i).concat(directories.slice(i + 1));
        break;
      }
    }
    setDirectories(directories);
    setClick(false);
  };

  return (
    <div>
      <Container>
        <Name>{name}</Name>
        <DirectoryBtn onClick={DirectoryRightBtnClick}>...</DirectoryBtn>
      </Container>
      {click ? (
        <Modal>
          {edit || del ? null : (
            <EditDelteBtnContainer>
              <Edit onClick={EditClick}>수정하기</Edit>
              <Delete onClick={DeleteClick}>삭제하기</Delete>
            </EditDelteBtnContainer>
          )}

          {edit ? (
            <EditBox>
              <EditInput value={newName} onChange={onChange} />
              <button onClick={EditBtnFunc}>수정</button>
            </EditBox>
          ) : null}
          {del ? (
            <DelBox>
              <DelBtn onClick={DelBtnFunc}>삭제하기</DelBtn>
            </DelBox>
          ) : null}
        </Modal>
      ) : null}
    </div>
  );
}

export default Directory;
