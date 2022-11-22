import { FaSearch as Search } from "react-icons/fa";
import { styled } from "styled-components";

// const NavBtnStyle = styled``;

function Header() {
  return (
    <header id="header" className="header disFlex">
      <h1 className="logo">Gabdong</h1>
      <div className="disFlex">
        <button>
          <Search />
        </button>
        <button>Log In</button>
      </div>
    </header>
  );
}

export default Header;
