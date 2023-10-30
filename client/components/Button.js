import styled from "styled-components";

export default function Button({
  text,
  classname = "",
  as = "",
  style = {},
  onClick,
}) {
  return (
    <ButtonSt
      className={`buttonText ${classname}`}
      as={as}
      style={style}
      onClick={onClick}
    >
      {text}
    </ButtonSt>
  );
}

const ButtonSt = styled.button`
  padding: 8px 12px;
  background: var(--gray);
  color: #ffffff;
  border-radius: var(--border-radius);
  transition: var(--transition);
  text-align: center;
  cursor: pointer;

  &:hover {
    background: var(--primary-color);
  }
`;
