import { NavLink } from "react-router-dom";

function NavBtn({ text, link }) {
  return (
    <h2>
      <NavLink to={`${link}`}>{text}</NavLink>
    </h2>
  );
}

export default NavBtn;
