import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  &:focus {
    background-color: red;
  }
  display: inline-flex;
  flex-flow: row wrap;
  height: 70px;
  width: 95%;
  padding: 3px;
  margin: 3px;
  border-radius: 10px;
  align-items: stretch;
  background-color: #ebf1ff;
  /* display: inline-flex;
  flex-flow: row wrap;
  height: 70px;
  width: 95%;
  padding: 3px;
  border-radius: 10px;
  margin: 3px;
  background-color: #ebf1ff;
  align-items: center; */
  /* position: relative; */
`;

const Name = styled.div``;

const DirectoryBtn = styled.div`
  &:hover {
    color: black;
  }
  /* width: 30px;
  height: 30px; */
  color: rgba(0, 0, 0, 0);
`;

const Modal = styled.div`
  height: 60px;
  width: 50%;
  display: block;
  align-content: space-between;
  margin: 3px;
  background-color: #ffefef;
`;

const Delete = styled.div`
  /* margin-right: 30%;
  padding: 20%; */
  width: 100%;

  /* vertical-align: middle;
  float: none; */
`;

const Edit = styled.div`
  /* margin-left: 30%;
  padding: 20%; */
  width: 100%;

  /* vertical-align: middle;
  float: none; */
`;

const EditDelteBtnContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const EditBox = styled.div``;

const EditInput = styled.input``;

const DelBox = styled.div``;

const DelBtn = styled.div``;

interface DirectoryListType {
  directoryId: number;
  directory: string;
}

interface Props {
  name: string;
  directories: DirectoryListType[];
  setDirectories(arr: DirectoryListType[]): void;
}

function Directory({ name, directories, setDirectories }: Props) {
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
    //let directories = [...Directories];
    let newDirectoryList = directories.slice();
    for (let i = 0; i < directories.length; i++) {
      if (directories[i].directory === name) {
        newDirectoryList = [
          ...directories.slice(undefined, i),
          ...[{ directoryId: i, directory: newName }],
          ...directories.slice(i + 1),
        ];
        // directories = directories.slice(0, i).concat([newName]);
        // directories.concat(directories.slice(i + 1));
        break;
      }
    }
    // directories.map((directoryname, index) => {
    //   return directoryname === name ? (directoryname = newName) : true;
    // });
    setDirectories(newDirectoryList);
    setClick(false);
  };

  const DelBtnFunc = () => {
    setDel(false);
    let newDirectoryList = directories.slice();
    for (let i = 0; i < directories.length; i++) {
      if (directories[i].directory === name) {
        newDirectoryList = directories
          .slice(undefined, i)
          .concat(directories.slice(i + 1));
        break;
      }
    }
    setDirectories(newDirectoryList);
    setClick(false);
  };

  return (
    <div>
      <Container>
        <Name>{name}</Name>
        {name === 'Today' || name === 'All' ? null : (
          <DirectoryBtn onClick={DirectoryRightBtnClick}>...</DirectoryBtn>
        )}

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
      </Container>
    </div>
  );
}

export default Directory;
