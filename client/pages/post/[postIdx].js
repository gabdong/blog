import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Link from "next/link";
import removeMd from "remove-markdown";
import styled from "styled-components";
import dynamic from "next/dynamic";

import { deletePost, getAllPosts, getPost } from "@/lib/apis/posts";
import { loginUser } from "@/store/modules/user";
import { checkLogin } from "@/lib/utils/utils";

const DynamicViewer = dynamic(() => import("@/components/DynamicViewer"), {
  ssr: false,
});

export default function Post({ pageProps }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const { user, postData, postIdx } = pageProps;

  //* markdown 문법 제거
  postData.removeMdContent = removeMd(
    postData.content.replace(/<\/?[^>]+(>|$)/g, "")
  );

  if (postData.removeMdContent.length > 200)
    postData.removeMdContent = postData.removeMdContent.substring(0, 200);

  useEffect(() => {
    if (user) dispatch(loginUser(user));
  }, []);

  return (
    <>
      <PostWrapSt>
        {/* //* 제목 */}
        <h2 className="headline">{postData.subject}</h2>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {/* //* 작성자, 작성일 */}
          <PostInfoWrapSt>
            <h3 className="subTitle">{postData.memberName}</h3>
            <p className="normalText">
              {new Date(postData.updateDatetime).toLocaleDateString("ko-KR", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })}
            </p>
          </PostInfoWrapSt>

          {/* //* 수정, 삭제 버튼 */}
          {postData.memberIdx !== user?.idx ? null : (
            <PostButtonWrapSt>
              <Link
                className="buttonText"
                href={`/postEditor/edit?post=${postIdx}`}
              >
                수정
              </Link>
              <p
                className="buttonText"
                onClick={() => deletePost(postIdx, router)}
              >
                삭제
              </p>
            </PostButtonWrapSt>
          )}
        </div>

        <ThumbnailWrap>
          <img src={postData.thumbnail} alt={postData.thumbnailAlt} />
        </ThumbnailWrap>

        <DynamicViewer initialValue={postData.content} />
      </PostWrapSt>
    </>
  );
}

export async function getStaticProps({ params, ...rest }) {
  const { postIdx } = params;
  const postData = await getPost(postIdx, true);
  const user = await checkLogin();

  console.log(user);
  return {
    props: {
      postData,
      postIdx,
    },
  };
}

export async function getStaticPaths() {
  const getAllPostsRes = await getAllPosts(true);
  const { postList } = getAllPostsRes;

  return {
    paths: postList.map((post) => {
      return {
        params: { postIdx: post.idx.toString() },
      };
    }),
    fallback: false,
  };
}

const PostWrapSt = styled.section`
  display: flex;
  flex-direction: column;
  gap: 20px;
  flex: 1;

  padding-right: 20px;
  height: 100%;

  @media screen and (max-width: 479px) {
    padding-right: 0px;
  }
`;
const PostInfoWrapSt = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;
const PostButtonWrapSt = styled.div`
  display: flex;
  gap: 8px;

  & > .buttonText {
    cursor: pointer;
    transition: var(--transition);
  }

  & > .buttonText:hover {
    color: var(--primary-color);
  }
`;
const ThumbnailWrap = styled.div`
  width: 100%;
  text-align: center;

  & img {
    max-width: 50%;
  }

  @media all and (max-width: 479px) {
    & img {
      max-width: 90%;
    }
  }
`;
