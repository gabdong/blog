import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { getPostList } from "../../apis/posts";

function PostList({ boardIdx, parentBoardIdx }) {
  const [loading, setLoading] = useState(true);
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    (async function () {
      setPostList(await getPostList(boardIdx, parentBoardIdx));
      setLoading(false);
    })();
  }, [boardIdx, parentBoardIdx]);

  return (
    <>
      {loading ? null : (
        <PostListUl>
          {postList.map((postData) => {
            return (
              <PostListLi key={postData.idx}>{postData.subject}</PostListLi>
            );
          })}
        </PostListUl>
      )}
    </>
  );
}

const PostListUl = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 860px;
`;
const PostListLi = styled.li`
  padding-bottom: 5px;
  border-bottom: 1px solid #ffffff;
  transition: var(--transition);
  cursor: pointer;

  &:hover {
    border-bottom: 1px solid var(--primary-color);
  }
`;

export default React.memo(PostList);
