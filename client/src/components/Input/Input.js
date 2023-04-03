import styled from "styled-components";

function Input({
  type = "text",
  name,
  placeholder,
  value,
  style = {},
  onChange,
  onKeyUp,
}) {
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
    />
  );
}

const InputSt = styled.input`
  padding: 8px 0px;
  border: none;
  border-bottom: 2px solid #ddd;
  cursor: pointer;
  color: #ffffff;
  transition: var(--transition);

  &:active,
  &:focus,
  &:hover {
    border-bottom: 2px solid var(--primary-color);
  }
`;

export default Input;
