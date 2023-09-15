import { getAllPosts, getPost } from "@/lib/apis/posts";

import WithAuthorization from "@/components/WithAuthorization";
import PostContent from "@/components/PostContent";
import { ssrRequireAuthentication } from "@/lib/utils/utils";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "@/store/modules/user";

export default function Post({ ...props }) {
  const dispatch = useDispatch();
  const { userData } = props.pageProps;
  const { postIdx, postData } = props.pageProps.gsspProps;

  useEffect(() => {
    if (userData && userData.isLogin) dispatch(loginUser(userData));
  }, [userData]);

  return <PostContent postIdx={postIdx} postData={postData} />;
}

export const getServerSideProps = ssrRequireAuthentication(async (ctx) => {
  const { postIdx } = ctx.params;
  const postData = postIdx ? await getPost(postIdx, true) : null;

  return { postIdx, postData };
});

// export const getServerSideProps = ssrRequireAuthentication((ctx) => {
//   const { postIdx } = ctx;

//   console.log(postIdx);
// });
// export async function getStaticProps({ params }) {
//   const { postIdx } = params;
//   const postData = await getPost(postIdx, true);

//   return {
//     props: {
//       postData,
//       postIdx,
//     },
//   };
// }

// export async function getStaticPaths() {
//   const getAllPostsRes = await getAllPosts(true);
//   const { postList } = getAllPostsRes;

//   return {
//     paths: postList.map((post) => {
//       return {
//         params: { postIdx: post.idx.toString() },
//       };
//     }),
//     fallback: "blocking",
//   };
// }
