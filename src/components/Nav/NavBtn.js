import { Link } from "react-router-dom";

function NavBtn({ text, link }) {
  return (
    <h2>
      <Link to={`/${link}`}>{text}</Link>
    </h2>
  );
}

export default NavBtn;
