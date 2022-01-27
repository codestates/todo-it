import React, { useState } from 'react';
import styled from 'styled-components';
import '../../fonts/font.css';
import { AiOutlineLeft } from 'react-icons/ai';
import axios from 'axios';

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

export const Modal = styled.div`
  border-radius: 10px;
  height: 60px;
  width: 50%;
  flex: 1;
  align-content: space-between;
  margin: 3px;
  background-color: #e9e9e9;
`;

export const Delete = styled.div`
  &:hover {
    font-weight: bold;
  }
  font-family: 'IBMPlexSansKR-Light';
  font-size: 14px;
  width: 100%;
  cursor: pointer;
`;

export const Edit = styled.div`
  &:hover {
    font-weight: bold;
  }
  font-family: 'IBMPlexSansKR-Light';
  font-size: 14px;
  width: 100%;
  cursor: pointer;
`;

export const EditDelteBtnContainer = styled.div`
  display: flex;
  flex-flow: column;
  align-content: space-around;
  padding: 10px;
`;

export const EditBox = styled.div`
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
  margin-left: 5px;
  margin-right: 5px;
  font-size: 13px;
  font-family: 'IBMPlexSansKR-Light';
`;

export const DelBox = styled.div`
  display: inline-flex;
  padding: 20px;
`;

export const DelBtn = styled.div`
  &:hover {
    font-weight: bold;
  }
  margin-left: 5px;
  margin-right: 5px;
  font-family: 'IBMPlexSansKR-Light';
`;

interface DirectoryListType {
  id: number;
  name: string;
}

interface Props {
  id: number;
  directories: DirectoryListType[];
  clickDirectory: number;
  name: string;
}

function Directory({ id, clickDirectory, directories, name }: Props) {
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
    if (newName.length === 0) {
      return;
    }
    axios
      .patch(
        `https://localhost:8000/users/me/directories/${id}`,
        { name: newName },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      )
      .then((res) => {
        setDel(false);
        setClick(false);
        window.location.href = 'https://localhost:3000/';
      })
      .catch((e) => console.log(e));
  };

  const DelBtnFunc = () => {
    axios
      .delete(`https://localhost:8000/users/me/directories/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      })
      .then((res) => {
        setDel(false);
        setClick(false);
        window.location.href = 'https://localhost:3000/';
      })
      .catch((e) => console.log(e));
  };
  const CancelEditBtnFunc = () => {
    setEdit(false);
    setnewName('');
  };
  const CancelDelBtnFunc = () => {
    setDel(false);
  };

  return (
    <div>
      <Container
        onMouseLeave={() => {
          setClick(false);
          setEdit(false);
          setDel(false);
        }}
        color={clickDirectory === id ? '#a8c4a6' : '#f7f7f7'}
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
                <div style={{ display: 'inline-flex', flexFlow: 'row wrap' }}>
                  <EditBtn onClick={EditBtnFunc}>수정</EditBtn>
                  <EditBtn onClick={CancelEditBtnFunc}>취소</EditBtn>
                </div>
              </EditBox>
            ) : null}
            {del ? (
              <DelBox>
                <DelBtn onClick={DelBtnFunc}>삭제</DelBtn>
                <DelBtn onClick={CancelDelBtnFunc}>취소</DelBtn>
              </DelBox>
            ) : null}
          </Modal>
        ) : null}

        {id === -3 || id === -2 ? null : (
          <div onClick={(e) => e.stopPropagation()}>
            <DirectoryBtn className="btn" onMouseOver={DirectoryRightBtnClick}>
              <AiOutlineLeft />
            </DirectoryBtn>
          </div>
        )}
      </Container>
    </div>
  );
}

export default Directory;
