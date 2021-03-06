import React from 'react';
import styled from 'styled-components';
import { BsArrowReturnRight } from 'react-icons/bs';
import '../../fonts/font.css';

const CommentContainer = styled.div`
  display: flex;
  font-family: 'LeferiPoint-WhiteObliqueA';
`;

const CommentValue = styled.div`
  padding: 20px;
`;

interface Iprops {
  comment?: string;
}

function Comment({ comment }: Iprops) {
  if (comment === '') {
    return <></>;
  }
  return (
    <CommentContainer>
      <CommentValue style={{ marginLeft: '5vw' }}>
        <BsArrowReturnRight />
      </CommentValue>
      <CommentValue>{comment}</CommentValue>
    </CommentContainer>
  );
}

export default Comment;
