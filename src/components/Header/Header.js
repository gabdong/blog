import { FaSearch as Search } from "react-icons/fa";
import styled from "styled-components";

const HeaderSt = styled.header`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 20px 0;
  position: sticky;
  left: 0;
  top: 0;
`;
const HeaderBtnWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;
const HeaderBtn = styled.button`
  font-family: "SUIT-Medium";
  font-size: 16px;
`;
const Logo = styled.h1`
  font-family: "SUIT-Bold";
  font-size: 22px;
`;

function Header() {
  return (
    <HeaderSt id="header">
      <Logo>Gabdong</Logo>
      <HeaderBtnWrap>
        <HeaderBtn>
          <Search />
        </HeaderBtn>
        <HeaderBtn>로그인</HeaderBtn>
      </HeaderBtnWrap>
    </HeaderSt>
  );
}

export default Header;
