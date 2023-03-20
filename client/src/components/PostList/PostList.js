import React, { useEffect, useState } from "react";
import styled from "styled-components";
import removeMd from "remove-markdown";
import { Link } from "react-router-dom";

import { getPostList } from "../../apis/posts";
import Pagination from "../Pagination/Pagination";

function PostList({ tagIdx, page }) {
  const [loading, setLoading] = useState(true);
  const [postList, setPostList] = useState([]);
  const [totalCnt, setTotalCnt] = useState(0);

  useEffect(() => {
    (async function () {
      const postListRes = await getPostList(tagIdx, page);
      const { postList: postListData } = postListRes;
      const { totalCnt } = postListRes;

      setPostList(postListData);
      setTotalCnt(totalCnt);
      setLoading(false);
    })();
  }, [tagIdx, page]);

  return (
    <>
      {loading ? null : (
        <>
          {/* //* 게시글 리스트 */}
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

              const contentStr = removeMd(
                content.replace(/<\/?[^>]+(>|$)/g, "")
              );

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

          {/* //* pagination */}
          <Pagination
            totalCnt={totalCnt}
            page={page}
            paginationCnt={5}
            path={`/tag/${tagIdx}`}
            limit={10}
          />
        </>
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
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
  }

  & > div .date {
    flex-shrink: 0;
  }
`;

export default React.memo(PostList);
