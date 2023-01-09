import styled from "styled-components";

function Button({ text, classname }) {
  return <ButtonSt className={`${classname} buttonText`}>{text}</ButtonSt>;
}

const ButtonSt = styled.button`
  padding: 8px 12px;
  background-color: #000000;
  color: #ffffff;
  border-radius: var(--border-radius);
  transition: var(--transition);

  &:hover {
    background-color: var(--primary-color);
  }
`;

export default Button;
