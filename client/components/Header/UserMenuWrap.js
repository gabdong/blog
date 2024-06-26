import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Link from "next/link";

import { removeToken } from "@/lib/apis/tokens";
import { logoutUser } from "@/store/modules/user";

/**
 * 로그인했을경우 이름영역 클릭시 보이는 드롭다운
 * @param {Object} props
 * @param {Function} props.closeUserMenuWrapFn 드롭다운 닫아주는 함수
 */
export default function UserMenuWrap({ closeUserMenuWrapFn }) {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    window.addEventListener("click", closeUserMenuWrapFn);

    return () => {
      window.removeEventListener("click", closeUserMenuWrapFn);
    };
  }, []);

  /**
   * * logout
   */
  const logoutFn = (e) => {
    removeToken();
    dispatch(logoutUser());
    router.reload();
  };

  return (
    <UserMenuWrapSt id="userMenuWrap">
      <li className="menuWrapBtn normalText" onClick={logoutFn}>
        Logout
      </li>
      <li className="menuWrapBtn mobileOnly normalText">
        <Link href="/postEditor/new">새 글 작성</Link>
      </li>
    </UserMenuWrapSt>
  );
}

const UserMenuWrapSt = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 16px;

  padding: var(--box-padding);
  background: var(--dark-l);
  border-radius: var(--border-radius);
  position: absolute;
  right: 0;
  top: calc(100% + 8px);

  & > li {
    white-space: nowrap;
    cursor: pointer;
    transition: var(--transition);
  }

  & > li:hover {
    color: var(--primary-color);
  }

  @media all and (max-width: 767px) {
    top: calc(100% + 10px);
  }
`;
