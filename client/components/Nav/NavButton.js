import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";

/**
 * * 네비게이션 버튼
 * @param {String} text: 버튼 텍스트
 * @param {String} path: 경로
 * @param {Boolean} active: 게시글 등 NavButton path와 맞지 않아도 active효과를 주기 위함
 */
export default function NavButton({ text, path, active }) {
  const router = useRouter();

  return (
    <>
      <NavButtonSt
        className={active || router.asPath === path ? "active" : ""}
        href={path}
      >
        {text}
      </NavButtonSt>
    </>
  );
}

const NavButtonSt = styled(Link)`
  font-family: "SUIT-Regular";
  font-size: 14px;
  letter-spacing: 0.15px;
  cursor: pointer;
  transition: var(--transition);

  &:hover {
    color: #ffffff;
  }

  &.active {
    color: var(--primary-color);
    font-weight: 700;
  }

  @media all and (max-width: 767px) {
    font-size: 16px;
  }
`;
