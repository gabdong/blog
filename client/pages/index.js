import styled from "styled-components";

import { ssrRequireAuthentication } from "@/lib/utils/utils";

import Tab from "@/components/Tab";
import Introduce from "@/components/Introduce";
import PostList from "@/components/PostList";

export default function Index({}) {
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

export const getServerSideProps = ssrRequireAuthentication();

const HomeWrapSt = styled.section`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 20px;

  min-width: 0;
  max-width: 100%;
`;
