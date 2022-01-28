import React, { useState } from 'react';
import styled from 'styled-components';
import Comment from './Comment';
import { BsChatLeftText } from 'react-icons/bs';
import { BsArrowReturnRight } from 'react-icons/bs';
import { AiOutlineLeft } from 'react-icons/ai';
import axios from 'axios';
import { Modal } from '../SideBar/Directory';
import { InputBox, AddContainer, CalendarBtn, CancelBtn } from './AddTodo';

const Todo = styled.div`
  &:hover {
    > div > div.todoBtn {
      color: black;
    }
  }
  width: 98%;
  display: flex;
  min-height: 8vh;
  border-radius: 10px;
  background-color: #a8c4a6;
  margin: 8px;
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

// const CalendarBtn = styled.input`
//   /* all: unset;
//   padding-left: 10px;
//   padding-right: 10px; */
// `;

const TodoInfo = styled.div`
  display: flex;
  align-items: center;
  padding-left: 3vw;
  overflow: auto;
  word-break: normal;
  /* justify-content: center; */
`;

const MiniModal = styled.div`
  &:hover {
    font-weight: bold;
  }
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  max-width: 50px;
  padding: 5px;
`;

const AddTodoInput = styled.textarea`
  font-family: 'IBMPlexSansKR-Light';
  font-size: 17px;
  border: none;
  border-right: 0px;
  border-top: 0px;
  border-left: 0px;
  border-bottom: 0px;
  padding: 5px;
  width: 20vw;
  height: 30px;
  flex: 1;
  margin: 10px;
`;

interface todoListType {
  id?: number;
  content?: string;
  isDone?: boolean;
  comment?: string;
  deadline?: string;
  directoryId?: number;
}
interface DirectoryListType {
  id: number;
  name: string;
}
interface Props {
  id?: number;
  todoList: todoListType[];
  setTodoList(arr: todoListType[]): void;
  content?: string;
  directoryId?: number;
  Dday?: string;
  isDone?: boolean;
  directories: DirectoryListType[];
  comment?: string;
}

function Todos({
  id,
  todoList,
  setTodoList,
  content,
  isDone,
  directoryId,
  Dday,
  directories,
  comment,
}: Props) {
  const [select, setSelect] = useState<boolean>(false);
  const [editBtn, setEditBtn] = useState(false);
  const [click, setClick] = useState(false);
  const [delBtn, setDelBtn] = useState(false);
  const [editName, setEditName] = useState(content);
  const [selectDirectory, setSelectDirectory] = useState(directoryId);
  const [calendarValue, setCalendarValue] = useState(Dday);
  const [addComment, setAddComment] = useState(comment);
  const [isCommentOpen, setIsCommentOpen] = useState(false);

  const CheckboxClick = () => {
    axios
      .patch(
        `https://localhost:8000/users/me/todos/${id}`,
        { content: content, comment: comment, isDone: !isDone, deadline: Dday },
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

  const TodoDelFunc = () => {
    axios
      .delete(`https://localhost:8000/users/me/todos/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      })
      .then((res) => {
        window.location.href = 'https://localhost:3000/';
      });
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
    setSelectDirectory(+value);
  };
  const dateSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCalendarValue(value);
  };

  const EditFunc = () => {
    // setTodoList(newTodoList);
    axios
      .patch(
        `https://localhost:8000/users/me/todos/${id}`,
        {
          content: editName,
          comment: comment,
          isDone: isDone,
          deadline: calendarValue,
          // directoryId: selectDirectory 폴더 바꾸기 요청 x
        },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      )
      .then((res) => {
        setClick(false);
        setEditBtn(false);
        window.location.href = 'https://localhost:3000/';
      })
      .catch((e) => console.log(e));
  };

  const [isCommentInput, setIsCommentInput] = useState(false);

  const CommentInputHandler = () => {
    setIsCommentInput(!isCommentInput);
    setClick(false);
    // setDelBtn(false);
    // setEditBtn(false);
  };
  const TodoDelCheck = () => {
    setDelBtn(true);
  };

  const CancelDelBtnFunc = () => {
    setDelBtn(false);
  };

  const EditCancelFunc = () => {
    setEditBtn(false);
    setClick(false);
  };
  const InputOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setEditName(value);
  };

  const CommentHandler = () => {
    axios
      .patch(
        `https://localhost:8000/users/me/todos/${id}`,
        {
          content: content,
          comment: addComment,
          isDone: isDone,
        },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      )
      .then((res) => {
        setIsCommentInput(false);
        window.location.href = './';
      })
      .catch((e) => console.log(e));
  };

  return (
    <>
      <Todo
        style={
          isDone
            ? {
                color: 'gray',
                textDecoration: 'line-through',
                backgroundColor: '#f7f7f7',
              }
            : {}
        }
        onClick={() => {
          setClick(false);
        }}
      >
        <Box
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: '5%',
          }}
        >
          <Checkbox
            onChange={CheckboxClick}
            type="checkbox"
            select={select}
            checked={isDone ? true : false}
          />
        </Box>
        <Box>
          <TodoInfo
            style={{
              flex: '1',
              maxWidth: '65%',
              fontFamily: 'S-CoreDream-3Light',
              fontWeight: 'bold',
            }}
          >
            {content}{' '}
            {!comment ? (
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

          <TodoInfo
            style={{ padding: '0 40px', fontFamily: 'IBMPlexSansKR-Light' }}
          >
            {directories.filter((obj) => obj.id === directoryId)[0].name}
          </TodoInfo>
          <TodoInfo
            style={{ padding: '0 40px', fontFamily: 'IBMPlexSansKR-Light' }}
          >
            {Dday?.slice(0, 10)}
          </TodoInfo>
          <div
            className="todoBtn"
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
            style={{ display: `${click ? 'none' : ''}` }}
          >
            <AiOutlineLeft
              style={{ visibility: `${editBtn ? 'hidden' : 'visible'}` }}
            />
          </div>
        </Box>
        {click ? (
          <Modal onClick={(e) => e.stopPropagation()}>
            {editBtn || delBtn ? null : (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  height: '100%',
                }}
              >
                <MiniModal onClick={CommentInputHandler}>주석</MiniModal>
                <MiniModal onClick={TodoEditFunc}>수정</MiniModal>
                <MiniModal onClick={TodoDelFunc}>삭제</MiniModal>
              </div>
            )}
            {delBtn ? (
              <div>
                <MiniModal onClick={TodoDelFunc}>삭제</MiniModal>
                <MiniModal onClick={CancelDelBtnFunc}>취소</MiniModal>
              </div>
            ) : null}
          </Modal>
        ) : null}
      </Todo>

      {isCommentOpen ? <Comment comment={comment}></Comment> : ''}

      {editBtn ? (
        <AddContainer
          style={{
            borderRadius: '10px',
            width: '98%',
            margin: '8px',
            alignItems: 'center',
          }}
        >
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
                value={editName}
              ></AddTodoInput>
            </div>
            <CalendarBtn
              type="date"
              onChange={dateSelect}
              value={calendarValue}
            ></CalendarBtn>
            <CancelBtn onClick={EditFunc}>확인</CancelBtn>
            <CancelBtn onClick={EditCancelFunc}>취소</CancelBtn>
          </InputBox>
        </AddContainer>
      ) : null}

      {/* <div>
          
          <input onChange={onChange} value={editName}></input>
          
          <div onClick={EditFunc}>확인</div>
        </div>
      ) : null} */}
      {isCommentInput ? (
        <AddContainer
          style={{
            backgroundColor: '#d3d3d3',
            borderRadius: '10px',
            width: '98%',
            margin: '8px',
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <BsArrowReturnRight />
            </div>
            <AddTodoInput
              style={{ maxWidth: '60%' }}
              onChange={(e) => {
                setAddComment(e.target.value);
              }}
              value={addComment}
            ></AddTodoInput>
            {/* <input
              type="text"
              value={addComment}
              onChange={(e) => {
                setAddComment(e.target.value);
              }}
            /> */}
            <CancelBtn onClick={CommentHandler}>확인</CancelBtn>
            <CancelBtn
              onClick={() => {
                setIsCommentInput(false);
              }}
            >
              취소
            </CancelBtn>
            {/* <div onClick={CommentHandler}>확인</div> */}
          </div>
        </AddContainer>
      ) : (
        ''
      )}
    </>
  );
}

export default Todos;
