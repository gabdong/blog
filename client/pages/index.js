import { useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { loginUser } from "@/store/modules/user";
import { checkLogin } from "@/lib/apis/tokens";

import Tab from "@/components/Tab";
import Introduce from "@/components/Introduce";
import PostList from "@/components/PostList";

export default function Index({ pageProps }) {
  const dispatch = useDispatch();
  const { user } = pageProps;

  useEffect(() => {
    if (user) dispatch(loginUser(user));
  }, []);

  return (
    <>
      <HomeWrapSt>
        <Tab
          tabBtnList={{
            latestPostList: {
              label: "최근게시물",
              path: "/?tabItem=latestPostList",
            },
            introduce: {
              label: "소개",
              path: "/?tabItem=introduce",
            },
          }}
          tabItemList={{
            latestPostList: () => (
              <PostList page={1} limit={9} paginationUsing={false} />
            ),
            introduce: () => <Introduce />,
          }}
          tabCnt={2}
        />
      </HomeWrapSt>
    </>
  );
}

export async function getServerSideProps(ctx) {
  const user = await checkLogin(true, ctx.req.headers?.cookie);
  return { props: { user: user } };
}

const HomeWrapSt = styled.section`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 20px;
`;
