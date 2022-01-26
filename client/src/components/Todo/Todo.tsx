import React, { useState } from 'react';
import styled from 'styled-components';
import Comment from './Comment';
import { BsChatLeftText } from 'react-icons/bs';

const Todo = styled.div`
  &:hover {
    > div > div.todoBtn {
      color: black;
    }
  }
  width: 100%;
  display: flex;
  /* height: 10vh; */
  min-height: 8vh;
  box-shadow: 1px 1px 2px rgb(184, 184, 184), -1px -1px 2px #ffffff;
  align-items: center;
  > div > div.todoBtn {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: large;
    font-weight: bold;
    min-width: 50px;
    height: 50px;
    color: rgba(0, 0, 0, 0);
    cursor: pointer;
  }
`;

const Box = styled.div`
  width: 90%;
  display: flex;
`;

const Checkbox = styled.input<{ select: boolean }>`
  width: 20px;
  height: 20px;
`;

const CalendarBtn = styled.input`
  /* all: unset;
  padding-left: 10px;
  padding-right: 10px; */
`;

const TodoInfo = styled.div`
  display: flex;
  align-items: center;
  padding-left: 3vw;
  overflow: auto;
  word-break: normal;
  /* justify-content: center; */
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
  index: number;
  todoList: todoListType[];
  setTodoList(arr: todoListType[]): void;
  content: string;
  directory: string;
  Dday: string;
  directories: DirectoryListType[];
  comment: string;
}

function Todos({
  index,
  todoList,
  setTodoList,
  content,
  directory,
  Dday,
  directories,
  comment,
}: Props) {
  const [select, setSelect] = useState<boolean>(false);
  const [editBtn, setEditBtn] = useState(false);
  const [click, setClick] = useState(false);
  const [editName, setEditName] = useState(content);
  const [selectDirectory, setSelectDirectory] = useState(directory);
  const [calendarValue, setCalendarValue] = useState(Dday);
  const [addComment, setAddComment] = useState(comment);
  const [isCommentOpen, setIsCommentOpen] = useState(false);

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
        {
          content: editName,
          directory: selectDirectory,
          Dday: calendarValue,
          comment: addComment,
        },
      ],
      ...todoList.slice(index + 1),
    ];
    setTodoList(newTodoList);
    setClick(false);
    setEditBtn(false);
  };

  return (
    <>
      <Todo
        style={select ? { color: 'gray', textDecoration: 'line-through' } : {}}
      >
        <Box
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: '5%',
          }}
        >
          <Checkbox onChange={CheckboxClick} type="checkbox" select={select} />
        </Box>
        <Box>
          <TodoInfo style={{ flex: '1', maxWidth: '65%' }}>
            {content}{' '}
            {comment.length === 0 ? (
              ''
            ) : (
              <BsChatLeftText
                onClick={() => {
                  setIsCommentOpen(!isCommentOpen);
                }}
                style={{ margin: '20px', cursor: 'pointer' }}
              />
            )}
          </TodoInfo>

          <TodoInfo style={{ padding: '0 40px' }}>{directory}</TodoInfo>
          <TodoInfo style={{ padding: '0 40px' }}>{Dday}</TodoInfo>
          <div className="todoBtn" onClick={onClick}>
            ...
          </div>
        </Box>
      </Todo>

      {isCommentOpen ? <Comment comment={comment}></Comment> : ''}

      {click ? (
        <div>
          <div onClick={TodoDelFunc}>삭제</div>
          <div onClick={TodoEditFunc}>수정</div>
        </div>
      ) : null}
      {editBtn ? (
        <div>
          <select onChange={handleSelect}>
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
