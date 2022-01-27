import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const AddContainer = styled.div`
  /* line-height: 15vh; */
  background-color: #a8c4a6;
  height: 65px;
  width: 100%;
  padding: 1vh 0;
  vertical-align: middle;
  /* box-shadow: 1px 1px 2px rgb(184, 184, 184), -1px -1px 2px #ffffff; */
`;

const InputBox = styled.div`
  display: flex;
  justify-content: center;
  vertical-align: middle;
`;

const PlusBtnContainer = styled.div`
  &:hover {
    font-weight: bold;
    color: #3a573a;
    font-size: 17px;
  }
  height: 30px;
  text-align: center;
  font-family: 'Y_Spotlight';
  color: #616161;
  font-size: 16px;
  /* font-size: large; */
  /* box-shadow: 1px 1px 2px rgb(184, 184, 184), -1px -1px 2px #ffffff; */
  font-weight: middle;
  padding-top: 20px;
  padding-right: 20px;
  cursor: pointer;
`;
const CalendarBtn = styled.input`
  /* all: unset;
  padding-left: 10px;
  padding-right: 10px; */
  border: none;
  height: 38px;
  margin: 10px;
`;

const CancelBtn = styled.button`
  all: unset;
  &:hover {
    font-weight: bold;
  }
  font-family: 'IBMPlexSansKR-Light';
  font-weight: middle;
  margin: 10px;
  height: 38px;
  width: 45px;
  border: 1px solid none;
  border-radius: 10px;
  background-color: #fafafa;
  cursor: pointer;
`;

const AddTodoInput = styled.textarea`
  /* height: 3em; */
  /* width: 20em; */
  /* font-size: 18px; */
  font-family: 'IBMPlexSansKR-Light';
  font-size: 18px;
  border: none;
  border-right: 0px;
  border-top: 0px;
  border-left: 0px;
  border-bottom: 0px;
  width: 20vw;
  height: 35px;
  flex: 1;
  margin: 10px;
`;

const Warning = styled.div`
  font-size: smaller;
  color: #b80000;
`;

interface Todo {
  id?: number;
  content?: string;
  isDone?: boolean;
  comment?: string;
  deadline?: string;
}

interface DirectoryListType {
  id: number;
  name: string;
}

interface Props {
  directories: DirectoryListType[];
  todoList: Todo[];
  setTodoList(arr: Todo[]): void;
}

function AddTodo({ directories, todoList, setTodoList }: Props) {
  const [addBtnClick, setAddBtnClick] = useState(false);
  const [name, setName] = useState('');
  const [calendarValue, setCalendarValue] = useState('');
  const [selectDirectory, setSelectDirectory] = useState(-1);
  const [isEmpty, setIsEmpty] = useState(false);
  const AddBtnFunc = () => {
    setAddBtnClick(!addBtnClick);
  };

  const CancelFunc = () => {
    setAddBtnClick(false);
  };

  const TodoAddFunc = () => {
    //console.log(name, selectDirectory, calendarValue, selectDirectory);
    if (
      name.length === 0 ||
      selectDirectory === -1 ||
      calendarValue.length === 0
    ) {
      setIsEmpty(true);
      return;
    }
    setIsEmpty(false);

    axios
      .post(
        'https://localhost:8000/users/me/todos',
        {
          content: name,
          deadline: calendarValue,
          directoryId: selectDirectory,
        },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      )
      .then((res) => {
        window.location.href = 'https://localhost:3000/';
      })
      .catch((e) => console.log(e));
  };

  const InputOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setName(value);
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectDirectory(+value);
  };

  const dateSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCalendarValue(value);
  };

  return (
    <>
      {!addBtnClick ? (
        <PlusBtnContainer onClick={AddBtnFunc}>+ New Todo</PlusBtnContainer>
      ) : (
        <AddContainer>
          <InputBox>
            <select
              style={{
                margin: '10px',
                width: '120px',
                height: '40px',
                fontFamily: 'IBMPlexSansKR-Light',
                border: 'none',
              }}
              onChange={handleSelect}
            >
              {[{ name: 'Directory', id: -1 }, ...directories.slice(2)].map(
                (obj, index) => {
                  return (
                    <option key={index} value={obj.id}>
                      {obj.name}
                    </option>
                  );
                }
              )}
            </select>
            <div>
              <AddTodoInput
                onChange={InputOnChange}
                value={name}
              ></AddTodoInput>
            </div>
            <CalendarBtn
              type="date"
              onChange={dateSelect}
              value={calendarValue}
            ></CalendarBtn>
            <CancelBtn onClick={TodoAddFunc}>확인</CancelBtn>
            <CancelBtn onClick={CancelFunc}>취소</CancelBtn>
          </InputBox>
          <Warning
            style={
              isEmpty
                ? {
                    marginTop: '-9px',
                    fontFamily: 'IBMPlexSansKR-Light',
                  }
                : { display: 'none' }
            }
          >
            내용과 D-day 를 모두 입력해주세요.
          </Warning>
        </AddContainer>
      )}
    </>
  );
}

export default AddTodo;
