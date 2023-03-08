import styled from "styled-components";
import { Link } from "react-router-dom";

function LinkButton({ text, classname = '', path }) {
  return <LinkButtonSt className={`${classname} buttonText`} to={path}>{text}</LinkButtonSt>;
}

const LinkButtonSt = styled(Link)`
  padding: 8px 12px;
  background-color: var(--gray);
  color: #ffffff;
  border-radius: var(--border-radius);
  transition: var(--transition);
  cursor: pointer;

  &:hover {
    background-color: var(--primary-color);
  }
`;

export default LinkButton;
