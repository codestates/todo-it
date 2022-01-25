import React, { useState } from 'react';
import styled from 'styled-components';

const Todo = styled.div`
  width: 100%;
  height: 15vh;
  box-shadow: 1px 1px 2px rgb(184, 184, 184), -1px -1px 2px #ffffff;
`;

const Box = styled.div<{ padding: number }>`
  float: left;
  width: ${(props) => props.padding}%;
`;

const Checkbox = styled.input<{ select: boolean }>`
  {
    select ? 
    color: gray;
  }
  width: 20px;
  height: 20px;
`;

const CalendarBtn = styled.input`
  /* all: unset;
  padding-left: 10px;
  padding-right: 10px; */
`;

interface todoListType {
  content: string;
  directory: string;
  Dday: string;
}
interface DirectoryListType {
  directoryId: number;
  directory: string;
}
interface Props {
  index: number;
  todoList: todoListType[];
  setTodoList(arr: todoListType[]): void;
  content: string;
  directory: string;
  Dday: string;
  directories: DirectoryListType[];
}

function Todos({
  index,
  todoList,
  setTodoList,
  content,
  directory,
  Dday,
  directories,
}: Props) {
  const [select, setSelect] = useState<boolean>(false);
  const [editBtn, setEditBtn] = useState(false);
  const [click, setClick] = useState(false);
  const [editName, setEditName] = useState(content);
  const [selectDirectory, setSelectDirectory] = useState(directory);
  const [calendarValue, setCalendarValue] = useState(Dday);
  const CheckboxClick = () => {
    setSelect(!select);
  };

  const TodoDelFunc = () => {
    let newTodoList = [
      ...todoList.slice(undefined, index),
      ...todoList.slice(index + 1),
    ];
    setTodoList(newTodoList);
    setClick(false);
  };

  const TodoEditFunc = () => {
    setClick(!click);
    setEditBtn(true);
  };

  const onClick = () => {
    setClick(!click);
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEditName(value);
  };
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectDirectory(value);
  };
  const dateSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCalendarValue(value);
  };

  const EditFunc = () => {
    let newTodoList = [
      ...todoList.slice(undefined, index),
      ...[
        { content: editName, directory: selectDirectory, Dday: calendarValue },
      ],
      ...todoList.slice(index + 1),
    ];
    setTodoList(newTodoList);
    setClick(false);
    setEditBtn(false);
  };

  return (
    <>
      <Todo>
        <Box padding={5}>
          <Checkbox onChange={CheckboxClick} type="checkbox" select={select} />
        </Box>
        <Box padding={70}>
          <div>{content}</div>
          <div>{directory}</div>
        </Box>
        <Box padding={2}>
          {/* TODO: CreatedAt */}
          <div>{Dday}</div>
        </Box>
        <Box padding={20}>
          <div onClick={onClick}>...</div>
        </Box>
      </Todo>

      {click ? (
        <div>
          <div onClick={TodoDelFunc}>삭제</div>
          <div onClick={TodoEditFunc}>수정</div>
        </div>
      ) : null}
      {editBtn ? (
        <div>
          <select onChange={handleSelect}>
            {directories.map((obj, index) => {
              return (
                <option key={index} value={obj.directory}>
                  {obj.directory}
                </option>
              );
            })}
          </select>
          <input onChange={onChange} value={editName}></input>
          <CalendarBtn
            type="date"
            onChange={dateSelect}
            value={calendarValue}
          ></CalendarBtn>
          <div onClick={EditFunc}>확인</div>
        </div>
      ) : null}
    </>
  );
}

export default Todos;
