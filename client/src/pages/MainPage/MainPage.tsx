import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import SideBar from '../../components/SideBar/SideBar';
import Todo from '../../components/Todo/Todo';
import AddTodo from '../../components/Todo/AddTodo';
import axios from 'axios';

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
  userId?: number;
}

function MainPage({ userId }: Props) {
  const [clickDirectory, setClickDirectory] = useState(-2);

  interface Todo {
    id?: number;
    content?: string;
    isDone?: boolean;
    comment?: string;
    deadline?: string;
    directoryId?: number;
  }

  const [todo, setTodo] = useState<Todo[]>([]);

  interface DirectoryListType {
    id: number;
    name: string;
  }
  //dummyData
  const [directories, setDirectories] = useState<DirectoryListType[]>([
    { id: -2, name: 'All' },
    { id: -3, name: 'Today' },
  ]);

  useEffect(() => {
    axios
      .get('https://localhost:8000/users/me/directories', {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      })
      .then((res) => {
        setDirectories([...directories, ...res.data]);
      })
      .then(() => {
        axios
          .get('https://localhost:8000/users/me/todos', {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
          })
          .then((res) => {
            setTodo(res.data);
          })
          .catch((e) => console.log(e));
      })
      .catch((e) => console.log(e));
  }, []);

  const DirectoryClicked = (value: number) => {
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
      />
      <TodosContainer>
        <AddTodo
          directories={directories}
          todoList={todo}
          setTodoList={setTodo}
        />
        <TodoScrollContainer>
          {clickDirectory === -1 || clickDirectory === -2
            ? todo.map((obj, index) => {
                return (
                  <Todo
                    key={obj.id}
                    isDone={obj.isDone}
                    id={obj.id}
                    todoList={todo}
                    setTodoList={setTodo}
                    content={obj.content}
                    directoryId={obj.directoryId}
                    Dday={obj.deadline}
                    directories={directories}
                    comment={obj.comment}
                  />
                );
              })
            : clickDirectory === -3
            ? todo
                .filter(
                  (todoObj) => todoObj.deadline === today + 'T00:00:00.000Z'
                )
                .map((obj, index) => {
                  return (
                    <Todo
                      id={obj.id}
                      key={obj.id}
                      isDone={obj.isDone}
                      todoList={todo}
                      setTodoList={setTodo}
                      content={obj.content}
                      directoryId={obj.directoryId}
                      Dday={obj.deadline}
                      directories={directories}
                      comment={obj.comment}
                    />
                  );
                })
            : todo
                .filter((todoObj) => todoObj.directoryId === clickDirectory)
                .map((obj, index) => {
                  return (
                    <Todo
                      key={obj.id}
                      id={obj.id}
                      todoList={todo}
                      isDone={obj.isDone}
                      setTodoList={setTodo}
                      content={obj.content}
                      directoryId={obj.directoryId}
                      Dday={obj.deadline}
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
