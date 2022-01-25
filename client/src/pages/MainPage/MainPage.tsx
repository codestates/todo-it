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
  /* padding-top: 50px; */
`;

const TodosContainer = styled.div`
  float: right;
  width: 70%;
  height: 100%;
  overflow-y: scroll;
`;
interface Props {
  userId: number;
}

function MainPage({ userId }: Props) {
  const [clickDirectory, setClickDirectory] = useState('');

  interface todoListType {
    content: string;
    directory: string;
    Dday: string;
  }
  //dummyData
  const [todoList, setTodoList] = useState<todoListType[]>([
    { content: '책읽기', directory: '공부', Dday: '2022-01-31' },
    { content: '운동하기', directory: '관리', Dday: '2022-01-29' },
    { content: 'todo-it', directory: '개발', Dday: '2022-04-11' },
    { content: '과제 제출', directory: '공부', Dday: '2022-02-04' },
    { content: '팩하기', directory: '관리', Dday: '2022-01-25' },
    { content: '파이썬공부', directory: '공부', Dday: '2022-01-25' },
  ]);

  interface DirectoryListType {
    directoryId: number;
    directory: string;
  }
  //dummyData
  const [directories, setDirectories] = useState<DirectoryListType[]>([
    { directoryId: 0, directory: '공부' },
    { directoryId: 1, directory: '관리' },
    { directoryId: 2, directory: '개발' },
  ]);

  const DirectoryClicked = (value: string) => {
    setClickDirectory(value);
  };

  //Today 2022-01-01 형식으로 만들기
  const now = new Date();
  const year = String(now.getFullYear());
  let month = String(now.getMonth() + 1);
  if (month.length === 1) month = '0' + month;
  let date = String(now.getDate());
  if (date.length === 1) date = '0' + date;
  const today = year + '-' + month + '-' + date;

  return (
    <Container>
      <SideBar
        userId={userId}
        clickDirectory={clickDirectory}
        DirectoryClicked={DirectoryClicked}
        directories={directories}
        setDirectories={setDirectories}
      />
      <TodosContainer>
        <AddTodo
          directories={directories}
          todoList={todoList}
          setTodoList={setTodoList}
        />
        {clickDirectory === '' || clickDirectory === 'All'
          ? todoList.map((obj, index) => {
              return (
                <Todo
                  key={index}
                  index={index}
                  todoList={todoList}
                  setTodoList={setTodoList}
                  content={obj.content}
                  directory={obj.directory}
                  Dday={obj.Dday}
                  directories={directories}
                />
              );
            })
          : clickDirectory === 'Today'
          ? todoList
              .filter((todoObj) => todoObj.Dday === today)
              .map((obj, index) => {
                return (
                  <Todo
                    key={index}
                    index={index}
                    todoList={todoList}
                    setTodoList={setTodoList}
                    content={obj.content}
                    directory={obj.directory}
                    Dday={obj.Dday}
                    directories={directories}
                  />
                );
              })
          : todoList
              .filter((todoObj) => todoObj.directory === clickDirectory)
              .map((obj, index) => {
                return (
                  <Todo
                    key={index}
                    index={index}
                    todoList={todoList}
                    setTodoList={setTodoList}
                    content={obj.content}
                    directory={obj.directory}
                    Dday={obj.Dday}
                    directories={directories}
                  />
                );
              })}
      </TodosContainer>
    </Container>
  );
}

export default MainPage;
