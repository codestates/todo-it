import React, { useState } from 'react';
import styled from 'styled-components';
import SideBar from '../../components/SideBar/SideBar';
import Todo from '../../components/Todo/Todo';
import AddTodo from '../../components/Todo/AddTodo';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  box-sizing: border-box;
  text-align: center;
  padding-top: 50px;
`;

const TodosContainer = styled.div`
  float: right;
  width: 70%;
  height: 100%;
  overflow-y: scroll;
`;

function MainPage() {
  interface todoListType {
    content: string;
    directory: string;
    Dday: string;
  }

  const [todoList, setTodoList] = useState<todoListType[]>([
    { content: '책읽기', directory: 'asdfsd', Dday: '2022-01-31' },
    { content: '운동하기', directory: 'wegwef', Dday: '2022-01-29' },
    { content: 'react공부', directory: 'Wgwfwe', Dday: '2022-04-11' },
    { content: '과제 제출', directory: 'asdfsd', Dday: '2022-02-04' },
  ]);

  const [directories, setDirectories] = useState<string[]>([
    'asdfsd',
    'wegwef',
    'Wgwfwe',
  ]);

  return (
    <Container>
      <SideBar directories={directories} setDirectories={setDirectories} />
      <TodosContainer>
        <AddTodo
          directories={directories}
          todoList={todoList}
          setTodoList={setTodoList}
        />
        {todoList.map((todoObj, index) => (
          <Todo
            key={index}
            index={index}
            todoList={todoList}
            setTodoList={setTodoList}
            content={todoObj.content}
            directory={todoObj.directory}
            Dday={todoObj.Dday}
          />
        ))}
      </TodosContainer>
    </Container>
  );
}

export default MainPage;