import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { shallowEqual, useSelector } from "react-redux";
import styled from "styled-components";
import { RiCloseFill as Close } from "react-icons/ri";

import { getTagList } from "@/lib/apis/tags";

import NavButton from "@/components/Nav/NavButton";

/**
 * * mobile nav close
 */
const navClose = () => {
  const nav = document.getElementById("nav");
  const background = document.getElementById("navBackground");

  nav.classList.remove("active");
  background.classList.remove("active");
};

export default function Nav() {
  const user = useSelector((store) => store.user, shallowEqual);
  const { isLogin } = user;
  const router = useRouter();
  const { query } = router;

  const [tagLoading, setTagLoading] = useState(true);
  const [tagList, setTagList] = useState({});
  const [totalPostCnt, setTotalPostCnt] = useState(0);
  const [privatePostCnt, setPrivatePostCnt] = useState(0);
  const [activeTagIdx, setActiveTagIdx] = useState(null);

  /**
   * * 태그데이터 가져온 뒤 상태설정해주는 함수
   */
  const getTagData = async () => {
    const getTagListRes = await getTagList();
    const { data: tagDataRes } = getTagListRes;

    setTagList(tagDataRes.tagList);
    setTotalPostCnt(tagDataRes.totalPostCnt);
    setPrivatePostCnt(tagDataRes.privatePostCnt);
    setTagLoading(false);

    if (query.tagIdx || query.tag) {
      setActiveTagIdx(query.tagIdx ?? query.tag);
    } else {
      setActiveTagIdx(null);
    }
  };

  useEffect(() => {
    if (router.isReady) getTagData();
  }, [router.asPath, router.isReady]);

  return (
    <>
      {tagLoading ? (
        <NavSt id="nav" />
      ) : (
        <>
          <NavBackgroundSt
            id="navBackground"
            className="mobileOnly"
            onClick={navClose}
          />
          <NavSt id="nav">
            <CloseBtnSt className="mobileOnly" onClick={navClose} />
            <NavButton
              path="/tag/total?page=1"
              text={`Total (${totalPostCnt})`}
              active={activeTagIdx === "total" ? "active" : ""}
            />
            {Object.entries(tagList).map((tagData) => {
              const tagIdx =
                tagData[0] !== "total" ? Number(tagData[0]) : tagData[0];
              const { auth, name, postCnt } = tagData[1];
              const activeClass =
                Number(activeTagIdx) === tagIdx || activeTagIdx === name
                  ? "active"
                  : "";

              //TODO 로그인계정 권한도 확인하기
              if (auth === 1 && !isLogin) return "";

              return (
                <NavButton
                  key={tagIdx}
                  text={`${name} (${postCnt})`}
                  path={`/tag/${tagIdx}?page=1`}
                  active={activeClass}
                />
              );
            })}

            {isLogin ? (
              <NavButton
                path="/tag/private?page=1"
                text={`Private (${privatePostCnt})`}
              />
            ) : null}
            {isLogin ? <NavButton path="/settings" text="Settings" /> : null}
          </NavSt>
        </>
      )}
    </>
  );
}

const NavSt = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 8px;

  width: 140px;
  min-width: 140px;

  @media all and (max-width: 767px) {
    width: 80%;
    height: 100%;
    padding: 20px;
    background: rgba(0, 0, 0, 0.8);
    overflow-y: auto;
    position: fixed;
    left: -80%;
    top: 0;
    z-index: 32;
    transition: var(--transition);

    &::-webkit-scrollbar {
      width: 3px;
      background: var(--dark-l);
      border-radius: var(--border-radius);
    }
    &::-webkit-scrollbar-thumb {
      background: var(--primary-color);
      border-radius: var(--border-radius);
    }

    &.active {
      left: 0;
    }
  }
`;
const NavBackgroundSt = styled.div`
  @media all and (max-width: ${process.env.NEXT_PUBLIC_MOBILE_WIDTH}) {
    &.active {
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.8);
      position: fixed;
      left: 0;
      top: 0;
      z-index: 31;
    }
  }
`;
const CloseBtnSt = styled(Close)`
  font-size: 32px;
  cursor: pointer;
`;
