import Head from "next/head";
import { Provider } from "react-redux";
import styled from "styled-components";

import "@/styles/globals.css";
import wrapper from "@/store/configureStore";

import Header from "@/components/Header";
import Nav from "@/components/Nav";

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
      <WrapperSt id="wrapper">
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

//* 페이지 전체 영역
const WrapperSt = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px; // header, content gap

  width: 1920px;
  max-width: 90%;
  height: fit-content;
  margin: 0 auto;
  user-select: none;

  @media all and (max-width: ${process.env.NEXT_PUBLIC_MOBILE_WIDTH}) {
    gap: 20px; // header, content gap
  }
`;
//* 헤더제외 페이지(컨텐츠)
const MainSt = styled.main`
  display: flex;
  gap: 40px; // nav, content 간격

  width: 100%;
  padding-bottom: 60px;
`;
//* 모달 기준 wrap
const ModalSt = styled.aside`
  position: fixed;
  left: 0;
  top: 0;
  z-index: var(--modal-zIndex);
`;
