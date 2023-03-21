import styled from "styled-components";

import Tab from "../components/Tab/Tab";
import PostList from "../components/PostList/PostList";
import Introduce from "./Introduce";

function Home() {
  return (
    <HomeWrapSt>
      <Tab
        tabBtnList={{
          latest: {
            label: "최근게시물",
            path: "/?tabItem=latestPostList"
          },
          introduce: {
            label: "소개",
            path: "/?tabItem=introduce"
          }
        }}
        tabItemList={{
          latestPostList: () => <PostList page={1} limit={10} paginationUsing={false} />,
          introduce: () => <Introduce />,
        }}
        tabCnt={2}
      />
    </HomeWrapSt>
  );
}

const HomeWrapSt = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export default Home;
