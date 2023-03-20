import styled from "styled-components";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { removeToken } from "../../apis/tokens";
import { logoutUser } from "../../modules/user";

function UserMenuWrap() {
  const dispatch = useDispatch();

  /**
   * * logout
   */
  const logoutFn = () => {
    removeToken();
    dispatch(logoutUser());
  };

  return (
    <UserMenuWrapSt id="userMenuWrap">
      <li className="menuWrapBtn normalText" onClick={logoutFn}>
        Logout
      </li>
      <li className="menuWrapBtn mobileOnly normalText">
        <Link to="/post/new">새 글 작성</Link>
      </li>
    </UserMenuWrapSt>
  );
}

const UserMenuWrapSt = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 16px;

  padding: 12px 10px;
  background: var(--dark-l);
  border-radius: var(--border-radius);
  position: absolute;
  right: 0;
  top: calc(100% + 8px);

  @media all and (max-width: 479px) {
    top: calc(100% + 10px);
  }

  & > li {
    white-space: nowrap;
    cursor: pointer;
    transition: var(--transition);
  }

  & > li:hover {
    color: var(--primary-color);
  }
`;

export default UserMenuWrap;
