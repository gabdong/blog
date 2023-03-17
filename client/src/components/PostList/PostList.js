import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import removeMd from "remove-markdown";

import { getPostList } from "../../apis/posts";

function PostList({ tagIdx, page }) {
  const [loading, setLoading] = useState(true);
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    (async function () {
      setPostList(await getPostList(tagIdx, page));
      setLoading(false);
    })();
  }, [tagIdx, page]);

  return (
    <>
      {loading ? null : (
        <PostListUlSt>
          {postList.map((postData) => {
            const { idx, subject, content, datetime } = postData;
            const datetimeFormat = new Date(datetime).toLocaleDateString(
              "ko-KR",
              {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              }
            );

            const contentStr = removeMd(content.replace(/<\/?[^>]+(>|$)/g, ""));

            return (
              <PostListLiSt key={idx}>
                <PostLinkSt
                  to={`/post/${idx}?tag=${tagIdx}`}
                  state={{ activeTagIdx: tagIdx }}
                >
                  <p className="subTitle">{subject}</p>
                  <div>
                    <p className="caption content">{contentStr}</p>
                    <p className="caption date">{datetimeFormat}</p>
                  </div>
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
  gap: 16px;
`;

const PostListLiSt = styled.li`
  padding-bottom: 8px;
  border-bottom: 1px solid #ffffff;
  transition: var(--transition);
  cursor: pointer;

  &:hover {
    border-bottom: 1px solid var(--primary-color);
  }
`;

const PostLinkSt = styled(Link)`
  display: flex;
  flex-direction: column;
  gap: 10px;

  & > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 14px;
  }

  & > div .content {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  & > div .date {
    flex-shrink: 0;
  }
`;

export default React.memo(PostList);
