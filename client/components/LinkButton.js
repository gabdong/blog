import styled from "styled-components";
import Link from "next/link";

export default function LinkButton({ text, classname = "", href }) {
  return (
    <LinkButtonSt className={`${classname} buttonText`} href={href}>
      {text}
    </LinkButtonSt>
  );
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
