import { shallowEqual, useSelector } from "react-redux";
import styled from "styled-components";
import { RiCloseFill as Close } from "react-icons/ri";

import useTagData from "@/lib/hooks/useTagData";

import NavButton from "@/components/Nav/NavButton";
import { useRouter } from "next/router";

/**
 * * mobile nav close
 */
const navClose = () => {
  const nav = document.getElementById("nav");
  const background = document.getElementById("navBackground");

  nav.classList.remove("active");
  background.classList.remove("active");
};

/**
 * * 태그 네비게이션
 * @returns {JSX.Element}
 */
export default function Nav() {
  //* 출력 안할 페이지 설정
  const router = useRouter();
  const { asPath } = router;
  const noNavPages = ["/postEditor", "/404"];
  for (const noNavPage of noNavPages) {
    if (asPath.includes(`${noNavPage}`)) return null;
  }

  //* 로그인 정보
  const user = useSelector((store) => store.user, shallowEqual);
  const { isLogin } = user;

  //* 태그정보
  const { tagData } = useTagData();
  const { tagLoading, activeTagIdx } = tagData;

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
              text={`Total (${tagData.totalPostCnt})`}
              active={activeTagIdx === "total" ? "active" : ""}
            />
            {Object.entries(tagData.tagList).map((data) => {
              const tagIdx = data[0] !== "total" ? Number(data[0]) : data[0];
              const { auth, name, postCnt } = data[1];
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
                text={`Private (${tagData.privatePostCnt})`}
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
