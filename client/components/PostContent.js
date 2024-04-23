import Link from "next/link";
import removeMd from "remove-markdown";
import styled from "styled-components";

import { deletePost } from "@/lib/apis/posts";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

/**
 * * 게시글 내용
 * @param {Object} props
 * @param {Object} props.postData
 * @param {Number} props.postIdx
 * @returns {JSX.Element}
 */
export default function PostContent({ postData, postIdx, user }) {
  const router = useRouter();

  //* markdown 문법 제거 -> 메타태그용
  // postData.removeMdContent = removeMd(
  //   postData.content.replace(/<\/?[^>]+(>|$)/g, "")
  // );

  // if (postData.removeMdContent.length > 200)
  //   postData.removeMdContent = postData.removeMdContent.substring(0, 200);

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

        {/* //* 썸네일 */}
        <ThumbnailWrapSt>
          <img src={postData.thumbnail} alt={postData.thumbnailAlt} />
        </ThumbnailWrapSt>

        {/* //* 내용 */}
        <PostContentSt
          dangerouslySetInnerHTML={{ __html: postData.html }}
        ></PostContentSt>
      </PostWrapSt>
    </>
  );
}

const PostWrapSt = styled.section`
  display: flex;
  flex-direction: column;
  gap: 20px;
  flex: 1;

  min-width: 0;
  max-width: 100%;
  height: 100%;

  & img {
    max-width: 100%;
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
    color: #ffffff;
  }
`;
const ThumbnailWrapSt = styled.div`
  width: 100%;
  text-align: center;

  & img {
    max-width: 50%;
  }

  @media all and (max-width: ${process.env.NEXT_PUBLIC_MOBILE_WIDTH}) {
    & img {
      max-width: 90%;
    }
  }
`;
const PostContentSt = styled.div`
  word-break: break-all;
`;
