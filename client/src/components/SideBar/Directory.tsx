import React, { useState } from 'react';
import styled from 'styled-components';
import '../../fonts/font.css';
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
  background-color: #a8c4a6;
`;

const Name = styled.div`
  font-family: 'EliceDigitalBaeum_Bold';
  flex: 1;
  font-size: 20px;
  text-align: left;
  line-height: 70px;
  padding-left: 40px;
`;

const DirectoryBtn = styled.div`
  &:hover {
    color: black;
  }

  min-width: 50px;
  line-height: 70px;
  color: rgba(0, 0, 0, 0);
`;

const Modal = styled.div`
  border-radius: 10px;
  height: 60px;
  width: 50%;
  flex: 1;
  align-content: space-between;
  margin: 3px;
  background-color: #e9e9e9;
`;

const Delete = styled.div`
  width: 100%;
`;

const Edit = styled.div`
  width: 100%;
`;

const EditDelteBtnContainer = styled.div`
  display: flex;
  flex-flow: column;
  align-content: space-around;
  padding: 10px;
`;

const EditBox = styled.div`
  padding: 10px;
`;

const EditInput = styled.input`
  all: unset;
  width: 100%;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 1px solid gray;
`;
const EditBtn = styled.div``;

const DelBox = styled.div`
  display: block;
  padding: 20px;
`;

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
                <EditBtn onClick={EditBtnFunc}>수정</EditBtn>
              </EditBox>
            ) : null}
            {del ? (
              <DelBox>
                <DelBtn onClick={DelBtnFunc}>삭제하기</DelBtn>
              </DelBox>
            ) : null}
          </Modal>
        ) : null}

        {name === 'Today' || name === 'All' ? null : (
          <DirectoryBtn onClick={DirectoryRightBtnClick}>...</DirectoryBtn>
        )}
      </Container>
    </div>
  );
}

export default Directory;
