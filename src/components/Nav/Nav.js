import { NavLink } from "react-router-dom";

function Nav() {
  return (
    <nav id="nav">
      <NavLink to="/">
        <button>Home</button>
      </NavLink>
    </nav>
  );
}

export default Nav;
