import Head from "next/head";
import "@/styles/globals.css";
import styled from "styled-components";

import Header from "@/components/Header";
import { checkToken } from "@/apis/tokens";

export async function getServerSideProps() {
  const authCheck = await checkToken();

  console.log(authCheck);
  return {};
}

export default function App({ Component, pageProps }) {
  console.log("App rendering");
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
