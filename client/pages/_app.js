import Head from "next/head";
import { Provider } from "react-redux";
import styled from "styled-components";

import Header from "@/components/Header";
import wrapper from "@/store/configureStore";
import Nav from "@/components/Nav";
import "@/styles/globals.css";

export default function App({ Component, ...rest }) {
  const { store, props } = wrapper.useWrappedStore(rest);

  console.log(
    "---------------------------------App rendering---------------------------------"
  );
  return (
    <Provider store={store}>
      <Head>
        <title>Gabdong</title>
      </Head>
      <WrapperSt>
        <Header {...props} />
        <MainSt id="main">
          <Nav {...props} />
          <Component {...props} />
        </MainSt>
        <ModalSt id="modal" />
      </WrapperSt>
    </Provider>
  );
}

const WrapperSt = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;

  margin: 0 auto;
  user-select: none;
`;
const MainSt = styled.main`
  display: flex;
  gap: 20px;

  width: 1280px;
  max-width: 90%;
  padding-top: 80px;
  padding-bottom: 60px;

  @media all and (max-width: ${process.env.NEXT_PUBLIC_MOBILE_WIDTH}) {
    display: block;
    padding-top: 56px;
  }
`;
const ModalSt = styled.aside`
  position: fixed;
  left: 0;
  top: 0;
  z-index: 22;
`;
