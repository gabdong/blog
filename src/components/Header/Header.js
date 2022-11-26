import { FaSearch as Search } from "react-icons/fa";
import styled from "styled-components";

const HeaderSt = styled.header`
  width: 100%;
  padding: 20px 0;
  position: sticky;
  left: 0;
  top: 0;
`;
const LoginBtn = styled.button`
  font-size: 18px;
`;
const Logo = styled.h1`
  font-family: "SUIT-Bold";
  font-size: 24px;
`;

function Header() {
  return (
    <HeaderSt id="header" className="header disFlex spaceBetween">
      <Logo>Gabdong</Logo>
      <div className="disFlex alignItemsCenter gap10">
        <button>
          <Search />
        </button>
        <LoginBtn>Log In</LoginBtn>
      </div>
    </HeaderSt>
  );
}

export default Header;
