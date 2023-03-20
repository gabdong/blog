import styled from "styled-components";

import Tab from "../components/Tab/Tab";
import LatestPostList from "../components/PostList/LatestPostList";
import Introduce from "./Introduce";

function Home() {
  return (
    <HomeWrapSt>
      <Tab
        tabBtnList={{
          latest: { label: "최근게시물", active: true },
          introduce: { label: "소개", active: false },
        }}
        tabItemList={{
          latest: {
            component: (prop = {}) => <LatestPostList prop={prop} />,
            active: true,
          },
          introduce: {
            component: (prop = {}) => <Introduce prop={prop} />,
            active: false,
          },
        }}
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
