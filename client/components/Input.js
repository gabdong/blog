import { forwardRef } from "react";
import styled from "styled-components";

/**
 * * Input
 * @param {Object} props
 * @param {String} props.type
 * @param {String} props.name
 * @param {String} props.placeholder
 * @param {*} props.defaultValue
 * @param {Object} props.style
 * @param {Function} props.onChange
 * @param {Function} props.onKeyUp
 * @param {String} props.border all, top, bottom, left, right
 * @param {String} props.id
 * @param {String} props.accept 파일일경우 확장자
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
      accept,
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
        autoComplete="off"
        ref={ref}
        border={border}
        id={id}
        accept={accept}
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
