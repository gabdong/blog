import Header from "@/components/Header";

import "@/styles/globals.css";
import styled from "styled-components";

export default function App({ Component, pageProps }) {
  return (
    <WrapperSt>
      <Header />
      <MainSt id="main">
        <Component {...pageProps} />
      </MainSt>
    </WrapperSt>
  );
}

const WrapperSt = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;

  width: 1600px;
  max-width: 90%;
  margin: 0 auto;
  user-select: none;
`;
const MainSt = styled.main`
  display: flex;

  width: 1200px;
  max-width: 100%;
  padding-bottom: 60px;
`;
