import styled from "styled-components";

import Tab from "../components/Tab/Tab";

function Home() {
  return (
    <HomeWrapSt>
      <Tab tabBtnList={{ latest: "최근게시물", introduce: "소개" }} />
    </HomeWrapSt>
  );
}

const HomeWrapSt = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export default Home;
