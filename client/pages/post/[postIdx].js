import styled from "styled-components";

import { getAllPosts, getPost } from "@/lib/apis/posts";

import WithAuthorization from "@/components/WithAuthorization";
import PostContent from "@/components/PostContent";
import { useRouter } from "next/router";

export default function Post({ pageProps }) {
  const { postData, postIdx } = pageProps;
  // const router = useRouter();
  // const tagIdx = router.isReady ? router.query.tag : null;
  // const { tags } = postData;

  return WithAuthorization(PostContent)({ postData, postIdx });
}

export async function getStaticProps({ params }) {
  const { postIdx } = params;
  const postData = await getPost(postIdx, true);

  console.log(postData);
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
