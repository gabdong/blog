import { forwardRef } from "react";
import styled from "styled-components";

/**
 * * Input
 * @param {Object} props
 * @param {String} props.type
 * @param {String} props.placeholder
 */
const Input = forwardRef(
  (
    {
      type = "text",
      name,
      placeholder,
      defaultValue,
      style = {},
      onChange,
      onKeyUp,
      onFocus,
      border = "all",
      id,
    },
    ref
  ) => {
    return (
      <InputSt
        type={type}
        name={name}
        className="inputText"
        placeholder={placeholder}
        style={style}
        value={defaultValue}
        onChange={onChange}
        onKeyUp={onKeyUp}
        onFocus={onFocus}
        autoComplete="false"
        ref={ref}
        border={border}
        id={id}
      />
    );
  }
);

const InputSt = styled.input`
  padding: 8px 12px;
  ${(props) =>
    props.border == "all"
      ? "border: 1px solid #ddd;"
      : `border-${props.border} 1px solid #ddd;`}
  ${(props) =>
    props.border == "all" ? "border-radius: var(--border-radius);" : ""}
  cursor: pointer;
  transition: var(--transition);

  &:active,
  &:focus,
  &:hover {
    ${(props) =>
      props.border == "all"
        ? "border: 1px solid var(--primary-color);"
        : `border-${props.border} : 1px solid var(--primary-color);`}
  }
`;

export default Input;
