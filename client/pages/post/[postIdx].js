import styled from "styled-components";

import { getAllPosts, getPost } from "@/lib/apis/posts";

import WithAuthorization from "@/components/WithAuthorization";
import PostContent from "@/components/PostContent";

export default function Post({ pageProps }) {
  const { postData, postIdx } = pageProps;

  return WithAuthorization(PostContent)({ postData, postIdx });
}

export async function getStaticProps({ params }) {
  const { postIdx } = params;
  const postData = await getPost(postIdx, true);

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
    fallback: "blocking",
  };
}

const PostWrapSt = styled.section`
  display: flex;
  flex-direction: column;
  gap: 20px;
  flex: 1;

  min-width: 0;
  max-width: 100%;
  height: 100%;
  padding-right: 20px;

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
