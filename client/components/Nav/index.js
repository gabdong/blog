import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { shallowEqual, useSelector } from "react-redux";
import styled from "styled-components";
import { RiCloseFill as Close } from "react-icons/ri";

import { getTagList } from "@/apis/tags";

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
  const { asPath } = useRouter();

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
  };

  //? 랜더링 최적화 할수 있을지?
  useEffect(() => {
    getTagData();

    if (asPath.includes("/post")) {
      if (location.state?.activeTagIdx) {
        setActiveTagIdx(Number(location.state.activeTagIdx));
      } else {
        const searchParams = new URLSearchParams(location.search);
        setActiveTagIdx(Number(searchParams.get("tag")));
      }
    } else if (asPath.includes("/tag")) {
      setActiveTagIdx(Number(asPath.replace("/tag/", "")));
    } else {
      setActiveTagIdx(null);
    }
  }, []);
  
  return (
    <>
      {tagLoading ? (
        <NavSt id="nav" />
      ) : (
        <>
          <NavBackgroundSt id="navBackground" onClick={navClose} />
          <NavSt id="nav">
            <CloseBtnSt className="mobileOnly" onClick={navClose} />
            <NavButton
              path="/tag/total?page=1"
              text={`Total (${totalPostCnt})`}
              active={asPath.replace("/tag/", "") === "total" ? "active" : ""}
            />
            {Object.entries(tagList).map((tagData) => {
              const tagIdx =
                tagData[0] !== "total" ? Number(tagData[0]) : tagData[0];
              const { auth, name, postCnt } = tagData[1];

              const activeClass = activeTagIdx === tagIdx ? "active" : "";

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
    gap: 12px;

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
  @media all and (max-width: 767px) {
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
