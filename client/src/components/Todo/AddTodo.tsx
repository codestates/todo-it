import React, { useState } from 'react';
import styled from 'styled-components';

const AddContainer = styled.div`
  /* line-height: 15vh; */
  width: 100%;
  padding: 2vh 0;
  box-shadow: 1px 1px 2px rgb(184, 184, 184), -1px -1px 2px #ffffff;
`;

const InputBox = styled.div`
  display: flex;
  justify-content: center;
`;

const PlusBtnContainer = styled.div`
  height: 5vh;
  text-align: center;
  /* font-size: large; */
  box-shadow: 1px 1px 2px rgb(184, 184, 184), -1px -1px 2px #ffffff;
  font-weight: bold;
  padding-top: 20px;
  padding-right: 20px;
  cursor: pointer;
`;
const CalendarBtn = styled.input`
  /* all: unset;
  padding-left: 10px;
  padding-right: 10px; */
  margin: 10px;
`;

const CancelBtn = styled.button`
  all: unset;
  padding: 10px;
  margin: 10px;
  border: 1px solid black;
  border-radius: 10px;
  cursor: pointer;
`;

const AddTodoInput = styled.textarea`
  /* height: 3em; */
  /* width: 20em; */
  /* font-size: 18px; */
  width: 20vw;
  flex: 1;
  margin: 10px;
`;

const Warning = styled.div`
  font-size: smaller;
  color: red;
`;

interface todoListType {
  content: string;
  directory: string;
  Dday: string;
  comment: string;
}

interface DirectoryListType {
  directoryId: number;
  directory: string;
}

interface Props {
  directories: DirectoryListType[];
  todoList: todoListType[];
  setTodoList(arr: todoListType[]): void;
}

function AddTodo({ directories, todoList, setTodoList }: Props) {
  const [addBtnClick, setAddBtnClick] = useState(false);
  const [name, setName] = useState('');
  const [calendarValue, setCalendarValue] = useState('');
  const [selectDirectory, setSelectDirectory] = useState('');
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
      selectDirectory.length === 0 ||
      calendarValue.length === 0
    ) {
      setIsEmpty(true);
      return;
    }
    setIsEmpty(false);
    const todoObj = {
      content: name,
      directory: selectDirectory,
      Dday: calendarValue,
      comment: '',
    };
    setTodoList([...todoList, todoObj]);
    setSelectDirectory('');
    setCalendarValue('');
    setName('');
    setAddBtnClick(false);
  };

  const InputOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setName(value);
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectDirectory(value);
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
            <select style={{ margin: '10px' }} onChange={handleSelect}>
              {[{ directory: '=== 선택 ===' }, ...directories].map(
                (obj, index) => {
                  return (
                    <option key={index} value={obj.directory}>
                      {obj.directory}
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
          <Warning style={isEmpty ? {} : { display: 'none' }}>
            내용과 D-day 를 모두 입력해주세요.
          </Warning>
        </AddContainer>
      )}
    </>
  );
}

export default AddTodo;
