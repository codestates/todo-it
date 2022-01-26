import React, { useState } from 'react';
import styled from 'styled-components';
import '../../fonts/font.css';
const Container = styled.div`
  &:hover {
    > div > div.btn {
      color: black;
    }
  }
  display: inline-flex;
  flex-flow: row wrap;
  height: 70px;
  width: 95%;
  padding: 3px;
  margin: 3px;
  border-radius: 10px;
  background-color: ${(props) => props.color};
  /* background-color: #a8c4a6; */
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
  cursor: pointer;
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
  &:hover {
    font-weight: bold;
  }
  font-family: 'IBMPlexSansKR-Light';
  font-size: 14px;
  width: 100%;
  cursor: pointer;
`;

const Edit = styled.div`
  &:hover {
    font-weight: bold;
  }
  font-family: 'IBMPlexSansKR-Light';
  font-size: 14px;
  width: 100%;
  cursor: pointer;
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
  font-weight: bold;
  font-family: 'IBMPlexSansKR-Light';
`;
const EditBtn = styled.div`
  &:hover {
    font-weight: bold;
  }
  font-size: 13px;
  font-family: 'IBMPlexSansKR-Light';
`;

const DelBox = styled.div`
  display: block;
  padding: 20px;
`;

const DelBtn = styled.div`
  &:hover {
    font-weight: bold;
  }
  font-family: 'IBMPlexSansKR-Light';
`;

interface DirectoryListType {
  directoryId: number;
  directory: string;
}

interface Props {
  name: string;
  directories: DirectoryListType[];
  clickDirectory: string;
  setDirectories(arr: DirectoryListType[]): void;
}

function Directory({
  name,
  clickDirectory,
  directories,
  setDirectories,
}: Props) {
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
    if (newName.length === 0) {
      return;
    }
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
      <Container
        onMouseLeave={() => {
          setClick(false);
          setEdit(false);
          setDel(false);
        }}
        color={clickDirectory === name ? '#a8c4a6' : '#f7f7f7'}
      >
        <Name>{name}</Name>
        {click ? (
          <Modal
            onClick={(e) => e.stopPropagation()}
            onMouseLeave={() => {
              setClick(false);
              setEdit(false);
              setDel(false);
            }}
          >
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
                <DelBtn onClick={DelBtnFunc}>삭제</DelBtn>
              </DelBox>
            ) : null}
          </Modal>
        ) : null}

        {name === 'Today' || name === 'All' ? null : (
          <div onClick={(e) => e.stopPropagation()}>
            <DirectoryBtn className="btn" onMouseOver={DirectoryRightBtnClick}>
              ...
            </DirectoryBtn>
          </div>
        )}
      </Container>
    </div>
  );
}

export default Directory;
