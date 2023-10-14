import Head from "next/head";
import { Provider } from "react-redux";
import styled from "styled-components";

import Header from "@/components/Header";
import wrapper from "@/store/configureStore";
import Nav from "@/components/Nav";
import "@/styles/globals.css";

export default function App({ Component, ...rest }) {
  const { store, props: pageProps } = wrapper.useWrappedStore(rest);

  console.log(
    "---------------------------------App rendering---------------------------------"
  );
  return (
    <Provider store={store}>
      <Head>
        <title>Gabdong</title>
      </Head>
      <WrapperSt>
        <Header />
        <ModalSt id="modal" />
        <MainSt id="main">
          <Nav />
          <Component {...pageProps} />
        </MainSt>
      </WrapperSt>
    </Provider>
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
  gap: 20px;

  width: 1200px;
  max-width: 100%;
  padding-bottom: 60px;

  @media all and (max-width: ${process.env.NEXT_PUBLIC_MOBILE_WIDTH}) {
    display: block;
  }
`;
const ModalSt = styled.aside`
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1;
`;
