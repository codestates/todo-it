import React, { useState } from 'react';
import styled from 'styled-components';
import Comment from './Comment';
import { BsChatLeftText } from 'react-icons/bs';
import { AiOutlineLeft } from 'react-icons/ai';
import {
  Modal,
  EditDelteBtnContainer,
  DelBox,
  Edit,
  DelBtn,
  Delete,
} from '../SideBar/Directory';
import { InputBox, AddContainer, CalendarBtn, CancelBtn } from './AddTodo';
const Todo = styled.div`
  &:hover {
    > div > div.todoBtn {
      color: black;
    }
  }
  width: 98%;
  display: flex;

  /* height: 10vh; */
  min-height: 8vh;
  border-radius: 10px;
  background-color: #a8c4a6;
  margin: 8px;
  /* box-shadow: 1px 1px 2px rgb(184, 184, 184), -1px -1px 2px #ffffff; */
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
  width: 75px;
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

const EditBtns = styled.div`
  &:hover {
    font-weight: bold;
  }
  font-family: 'IBMPlexSansKR-Light';
  font-weight: middle;
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
  const [delBtn, setDelBtn] = useState(false);
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
    setDelBtn(false);
  };

  const TodoEditFunc = () => {
    setClick(!click);
    setEditBtn(true);
  };

  const onClick = () => {
    setClick(!click);
  };
  const InputOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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
    setClick(false);
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
    setEditBtn(false);
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

  return (
    <>
      <Todo
        style={
          select
            ? {
                color: 'gray',
                textDecoration: 'line-through',
                backgroundColor: '#f7f7f7',
              }
            : {}
        }
      >
        <Box
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: '5%',
          }}
        >
          <Checkbox select={select} type="checkbox" onChange={CheckboxClick} />
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

          <TodoInfo
            style={{ padding: '0 40px', fontFamily: 'IBMPlexSansKR-Light' }}
          >
            {directory}
          </TodoInfo>
          <TodoInfo
            style={{ padding: '0 40px', fontFamily: 'IBMPlexSansKR-Light' }}
          >
            {Dday}
          </TodoInfo>
          <div
            className="todoBtn"
            onClick={onClick}
            style={{ display: `${click ? 'none' : ''}` }}
          >
            <AiOutlineLeft
              style={{ visibility: `${editBtn ? 'hidden' : 'visible'}` }}
            />
          </div>
        </Box>
        {click ? (
          <Modal>
            {editBtn || delBtn ? null : (
              <div>
                <MiniModal onClick={TodoDelCheck}>삭제</MiniModal>
                <MiniModal onClick={TodoEditFunc}>수정</MiniModal>
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
              {[{ directory: 'Directory' }, ...directories].map(
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
      {isCommentOpen ? <Comment comment={comment}></Comment> : ''}
    </>
  );
}

export default Todos;
