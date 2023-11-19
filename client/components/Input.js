import { forwardRef } from "react";
import styled from "styled-components";

const Input = forwardRef(
  (
    { type = "text", name, placeholder, value, style = {}, onChange, onKeyUp },
    ref
  ) => {
    return (
      <InputSt
        type={type}
        name={name}
        className="inputText"
        placeholder={placeholder}
        style={style}
        value={value}
        onChange={onChange}
        onKeyUp={onKeyUp}
        autoComplete="false"
        ref={ref}
      />
    );
  }
);

const InputSt = styled.input`
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: var(--border-radius);
  cursor: pointer;
  color: #ffffff;
  transition: var(--transition);

  &:active,
  &:focus,
  &:hover {
    border: 1px solid var(--primary-color);
  }
`;

export default Input;
