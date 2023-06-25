import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Link from "next/link";
import removeMd from "remove-markdown";
import styled from "styled-components";

import { deletePost, getPost } from "@/apis/posts";
import { loginUser } from "@/store/modules/user";
import { checkLogin } from "@/utils/utils";

export default function Post({ pageProps }) {
  const dispatch = useDispatch();
  const { user } = pageProps;

  const router = useRouter();
  const { postIdx } = router.query;

  const [postData, setPostData] = useState({});
  const [loading, setLoading] = useState(true);

  /**
   * * 게시글 정보 불러온뒤 상태설정해주는 함수
   */
  const getPostData = async () => {
    setPostData(await getPost(postIdx));
    setLoading(false);
  };

  if (!loading) {
    //* markdown 문법 제거
    postData.removeMdContent = removeMd(
      postData.content.replace(/<\/?[^>]+(>|$)/g, "")
    );

    if (postData.removeMdContent.length > 200)
      postData.removeMdContent = postData.removeMdContent.substring(0, 200);
  }

  useEffect(() => {
    if (postIdx) getPostData();
    if (user) dispatch(loginUser(user));
  }, [postIdx]);

  return loading ? null : (
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
      </PostWrapSt>
    </>
  );
}

export async function getServerSideProps(ctx) {
  const user = await checkLogin(ctx);
  return { props: { user: user } };
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
