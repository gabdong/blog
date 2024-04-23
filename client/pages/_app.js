import Head from "next/head";
import { Provider } from "react-redux";
import styled from "styled-components";

import Header from "@/components/Header";
import wrapper from "@/store/configureStore";
import Nav from "@/components/Nav";
import "@/styles/globals.css";

export default function App({ Component, ...rest }) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const errorPages = ["/401", "/404", "/_error"];
  const noNavPages = ["/postEditor/[type]"];
  const pathname = rest.router.route;

  const isNoHeader = errorPages.includes(pathname);
  const isNoNav =
    errorPages.includes(pathname) || noNavPages.includes(pathname);

  console.log(
    "---------------------------------App rendering---------------------------------"
  );
  return (
    <Provider store={store}>
      <Head>
        <title>Gabdong</title>
      </Head>
      <WrapperSt>
        {!isNoHeader && <Header {...{ ...props, ...{ isNoNav } }} />}
        <MainSt id="main">
          {!isNoNav && <Nav {...props} />}
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

  width: 1280px;
  max-width: 90%;
  margin: 0 auto;
  user-select: none;

  @media all and (max-width: ${process.env.NEXT_PUBLIC_MOBILE_WIDTH}) {
    gap: 20px;
  }
`;
const MainSt = styled.main`
  display: flex;
  gap: 40px;

  width: 100%;
  padding-bottom: 60px;
`;
const ModalSt = styled.aside`
  position: fixed;
  left: 0;
  top: 0;
  z-index: 2;
`;
