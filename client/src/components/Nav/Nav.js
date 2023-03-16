import styled from "styled-components";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { RiCloseFill as Close } from "react-icons/ri";

import { getTagList } from "../../apis/tags.js";

import NavBtn from "./NavBtn.js";

function Nav() {
  const user = useSelector((store) => store.user);
  const { isLogin } = user;
  const location = useLocation();

  //TODO nav 언제 안나오게할지 정하기
  const { pathname } = location;
  // const navRendering = pathname === "/post/new" ? false : true;
  const navRendering = true;

  const [activeTagIdx, setActiveTagIdx] = useState(null);
  const [tagList, setTagList] = useState({});
  const [loading, setLoading] = useState(true);

  /**
   * * nav close
   */
  const navClose = () => {
    const nav = document.getElementById("nav");
    const background = document.getElementById("navBackground");

    nav.classList.remove("active");
    background.classList.remove("active");
  };

  useEffect(() => {
    (async function () {
      setTagList(await getTagList());

      if (pathname.includes("/post")) {
        if (location.state?.activeTagIdx) {
          setActiveTagIdx(Number(location.state.activeTagIdx));
        } else {
          const searchParams = new URLSearchParams(location.search);
          setActiveTagIdx(Number(searchParams.get("tag")));
        }
      } else if (pathname.includes("/tag")) {
        setActiveTagIdx(Number(pathname.replace("/tag/", "")));
      } else {
        setActiveTagIdx(null);
      }

      setLoading(false);
    })();
  }, [location.search, pathname, location.state?.activeTagIdx]);

  return (
    <>
      {loading || !navRendering ? (
        <NavSt id="nav" />
      ) : (
        <>
          <NavBackgroundSt id="navBackground" onClick={navClose} />
          <NavSt id="nav">
            <CloseBtnSt onClick={navClose} />
            {Object.entries(tagList).map((tagData) => {
              const tagIdx = Number(tagData[0]);
              const { auth, name } = tagData[1];

              const activeClass = activeTagIdx === tagIdx ? "active" : "";

              //TODO 로그인계정 권한도 확인하기
              if (auth === 1 && !isLogin) return "";

              return (
                <NavBtn
                  key={tagIdx}
                  text={name}
                  path={`/tag/${tagIdx}`}
                  active={activeClass}
                />
              );
            })}
            {isLogin ? <NavBtn path="/settings" text="Settings" /> : null}
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

  @media all and (max-width: 479px) {
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
  @media all and (max-width: 479px) {
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
  display: none;

  @media all and (max-width: 479px) {
    display: block;
    font-size: 32px;
  }
`;

export default Nav;
