import React, { useEffect, useState } from "react";
import styled from "styled-components";
import removeMd from "remove-markdown";
import { Link } from "react-router-dom";

import { getPostList } from "../../apis/posts";
import Pagination from "../Pagination/Pagination";
import MetaTag from "../MetaTag/MetaTag";

function PostList({
  tagIdx = "",
  page = 1,
  limit = 10,
  paginationUsing = true,
}) {
  const [loading, setLoading] = useState(true);
  const [postList, setPostList] = useState([]);
  const [totalCnt, setTotalCnt] = useState(0);

  useEffect(() => {
    (async function () {
      const postListRes = await getPostList(
        tagIdx,
        page,
        limit,
        paginationUsing
      );
      const postListData = postListRes?.postList || [];
      const totalCnt = postListRes?.totalCnt || 0;

      setPostList(postListData);
      setTotalCnt(totalCnt);
      setLoading(false);
    })();
  }, [tagIdx, page, limit, paginationUsing]);

  return (
    <>
      {loading ? null : (
        <>
          <MetaTag subject="gabdong" desc="김동환 개발블로그 게시글리스트" />

          {/* //* 게시글 리스트 */}
          <PostListUlSt>
            {postList.map((postData) => {
              const {
                idx,
                subject,
                content,
                thumbnail,
                thumbnailAlt,
                datetime,
              } = postData;

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
                <PostListLiSt key={idx} className="postListLi">
                  <PostLinkSt
                    to={`/post/${idx}?tag=${tagIdx}`}
                    state={{ activeTagIdx: tagIdx }}
                  >
                    {!thumbnail ? null : (
                      <PostThumbnailSt
                        style={{
                          background: `url(${thumbnail})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                        title={thumbnailAlt}
                      />
                    )}

                    <PostInfoWrapSt className="postInfoWrap">
                      <div>
                        <p className="subTitle postSubject">{subject}</p>
                        <p className="caption postContent">{contentStr}</p>
                      </div>
                      <p className="caption date">{datetimeFormat}</p>
                    </PostInfoWrapSt>
                  </PostLinkSt>
                </PostListLiSt>
              );
            })}
          </PostListUlSt>

          {/* //* pagination */}
          {!paginationUsing ? null : (
            <Pagination
              totalCnt={totalCnt}
              page={page}
              paginationCnt={5}
              path={`/tag/${tagIdx}`}
              limit={9}
            />
          )}
        </>
      )}
    </>
  );
}

const PostListUlSt = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;
const PostListLiSt = styled.li`
  width: calc(100% / 3 - 14px);
  background: var(--dark-l);
  transition: var(--transition);
  cursor: pointer;

  &:hover {
    transform: translateY(-8px);
  }

  @media all and (max-width: 1023px) {
    width: calc(50% - 10px);

    &:hover {
      transform: none;
    }
  }

  @media all and (max-width: 767px) {
    width: 100%;
    gap: 12px;
  }
`;
const PostLinkSt = styled(Link)`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const PostThumbnailSt = styled.div`
  padding-top: 52%;
`;
const PostInfoWrapSt = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 14px;
  
  height: 100%;
  padding 16px;

  & > div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: start;

    height: 80px;
  }

  & > div .postSubject {
    max-width: 100%;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  & > div .postContent {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    word-break: break-all;
    overflow: hidden;
  }

  & > div .date {
    flex-shrink: 0;
  }

  @media all and (max-width: 479px) {
    & > div {
      height: 60px;
    }
  }
`;

export default React.memo(PostList);
