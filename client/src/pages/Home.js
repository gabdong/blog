import styled from "styled-components";

import Tab from "../components/Tab/Tab";
import LatestPostList from "../components/PostList/LatestPostList";
import Introduce from "./Introduce";

function Home() {
  return (
    <HomeWrapSt>
      <Tab
        tabBtnList={{
          latest: "최근게시물",
          introduce: "소개",
        }}
        tabItemList={{
          latest: (prop = {}) => <LatestPostList prop={prop} />,
          introduce: (prop = {}) => <Introduce prop={prop} />,
        }}
        tabCnt={2}
        activeIndex={0}
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
