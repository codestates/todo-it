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
  display: flex;
  flex-direction: column;
`;

const TodoScrollContainer = styled.div`
  overflow-y: scroll;
  width: 100%;
  height: 80%;
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
    comment: string;
  }
  //dummyData
  const [todoList, setTodoList] = useState<todoListType[]>([
    { content: '책읽기', directory: '공부', Dday: '2022-01-31', comment: '' },
    { content: '운동하기', directory: '관리', Dday: '2022-01-29', comment: '' },
    {
      content: 'todo-it',
      directory: '개발',
      Dday: '2022-04-11',
      comment: 'MainPage 구현',
    },
    {
      content: '과제 제출',
      directory: '공부',
      Dday: '2022-02-04',
      comment: '',
    },
    { content: '팩하기', directory: '관리', Dday: '2022-01-25', comment: '' },
    {
      content: '파이썬공부',
      directory: '공부',
      Dday: '2022-01-25',
      comment: '조건문, 반복문',
    },
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
      <div style={{ height: '50px' }}>a</div>
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
        <TodoScrollContainer>
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
                    comment={obj.comment}
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
                      comment={obj.comment}
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
                      comment={obj.comment}
                    />
                  );
                })}
        </TodoScrollContainer>
      </TodosContainer>
    </Container>
  );
}

export default MainPage;
