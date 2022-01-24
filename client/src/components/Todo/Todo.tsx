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

interface todoListType {
  content: string;
  directory: string;
  Dday: string;
}

interface Props {
  index: number;
  todoList: todoListType[];
  setTodoList(arr: todoListType[]): void;
  content: string;
  directory: string;
  Dday: string;
}

function Todos({
  index,
  todoList,
  setTodoList,
  content,
  directory,
  Dday,
}: Props) {
  const [select, setSelect] = useState<boolean>(false);

  const CheckboxClick = () => {
    setSelect(!select);
  };

  const TodoDelFunc = () => {
    let newTodoList = [
      ...todoList.slice(undefined, index),
      ...todoList.slice(index + 1),
    ];
    setTodoList(newTodoList);
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
          <div onClick={TodoDelFunc}>삭제</div>
        </Box>
      </Todo>
    </>
  );
}

export default Todos;
