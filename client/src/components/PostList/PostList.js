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
        <PostListUlSt>
          {postList.map((postData) => {
            const { idx, subject, updateDatetime } = postData;
            const updateDatetimeFormat = new Date(
              updateDatetime
            ).toLocaleDateString();
            return (
              <PostListLiSt key={idx}>
                <PostLinkSt
                  to={`/post/${idx}?board=${boardIdx}`}
                  state={{ activeBoardIdx: boardIdx }}
                >
                  <p className="normalText">{subject}</p>
                  <p className="caption">{updateDatetimeFormat}</p>
                </PostLinkSt>
              </PostListLiSt>
            );
          })}
        </PostListUlSt>
      )}
    </>
  );
}

const PostListUlSt = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const PostListLiSt = styled.li`
  padding-bottom: 5px;
  border-bottom: 1px solid #ffffff;
  transition: var(--transition);
  cursor: pointer;

  &:hover {
    border-bottom: 1px solid var(--primary-color);
  }
`;

const PostLinkSt = styled(Link)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default React.memo(PostList);
