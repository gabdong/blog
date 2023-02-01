import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

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
            const { idx, subject, updateDatetime } = postData;
            const updateDatetimeFormat = new Date(
              updateDatetime
            ).toLocaleDateString();
            return (
              <PostListLi key={idx}>
                <PostLink to={`/post/${idx}`}>
                  <p className="normalText">{subject}</p>
                  <p className="caption">{updateDatetimeFormat}</p>
                </PostLink>
              </PostListLi>
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
const PostLink = styled(Link)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default React.memo(PostList);
