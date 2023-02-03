import styled from "styled-components";

function Button({ text, classname, as }) {
  return <ButtonSt className={`${classname} buttonText`} as={as}>{text}</ButtonSt>;
}

const ButtonSt = styled.button`
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

export default Button;
