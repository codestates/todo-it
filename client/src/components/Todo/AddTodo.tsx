import React, { useState } from 'react';
import styled from 'styled-components';

const AddContainer = styled.div`
  line-height: 15vh;
  width: 100%;
  height: 15vh;
  box-shadow: 1px 1px 2px rgb(184, 184, 184), -1px -1px 2px #ffffff;
`;

const DirectorySelect = styled.div``;

const PlusBtnContainer = styled.div`
  height: 5vh;
  text-align: right;
  padding-top: 20px;
  padding-right: 20px;
`;
const CalendarBtn = styled.input`
  /* all: unset;
  padding-left: 10px;
  padding-right: 10px; */
`;

const CancelBtn = styled.button`
  all: unset;
  padding: 2px;
  /* float: right; */
`;

const AddBtn = styled.button`
  all: unset;
  padding: 2px;
`;

const AddTodoInput = styled.input`
  height: 3em;
  width: 20em;
  font-size: 18px;
`;

interface todoListType {
  content: string;
  directory: string;
  Dday: string;
}

interface Props {
  directories: string[];
  todoList: todoListType[];
  setTodoList(arr: todoListType[]): void;
}

function AddTodo({ directories, todoList, setTodoList }: Props) {
  const [addBtnClick, setAddBtnClick] = useState(false);
  const [name, setName] = useState('');
  const [calendarValue, setCalendarValue] = useState('');
  const [selectDirectory, setSelectDirectory] = useState('');
  const AddBtnFunc = () => {
    setAddBtnClick(!addBtnClick);
  };

  const CancelFunc = () => {
    setAddBtnClick(false);
  };

  const TodoAddFunc = () => {
    //console.log(name, selectDirectory, calendarValue, selectDirectory);
    let todoObj = {
      content: name,
      directory: selectDirectory,
      Dday: calendarValue,
    };
    setTodoList([...todoList, todoObj]);
  };

  const InputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        <PlusBtnContainer onClick={AddBtnFunc}>+</PlusBtnContainer>
      ) : (
        <AddContainer>
          <DirectorySelect></DirectorySelect>
          <select onChange={handleSelect}>
            {directories.map((name, index) => {
              return (
                <option key={index} value={name}>
                  {name}
                </option>
              );
            })}
          </select>
          <AddTodoInput onChange={InputOnChange} value={name}></AddTodoInput>
          <CalendarBtn
            type="date"
            onChange={dateSelect}
            value={calendarValue}
          ></CalendarBtn>
          <AddBtn onClick={TodoAddFunc}>확인</AddBtn>
          <CancelBtn onClick={CancelFunc}>취소</CancelBtn>
        </AddContainer>
      )}
    </>
  );
}

export default AddTodo;
