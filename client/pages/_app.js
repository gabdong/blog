import Head from "next/head";
import "@/styles/globals.css";
import styled from "styled-components";

import wrapper from "@/store/configureStore";
import { checkToken } from "@/apis/tokens";

import Header from "@/components/Header";

//TODO prop-types 적용
function App({ Component, pageProps, test }) {
  console.log("App rendering");
  console.log(test);
  return (
    <>
      <Head>
        <title>Gabdong</title>
      </Head>
      <WrapperSt>
        <Header />
        <MainSt id="main">
          <Component {...pageProps} />
        </MainSt>
      </WrapperSt>
    </>
  );
}

App.getInitialProps = async (ctx) => {
  console.log('hi');

  return {test: 'test'};
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

export default wrapper.withRedux(App);