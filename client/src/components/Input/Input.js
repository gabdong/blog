const { default: styled } = require("styled-components");

function Input({
  type = "text",
  name,
  placeholder,
  value,
  style = {},
  onChange,
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
      autoComplete="false"
    />
  );
}

const InputSt = styled.input`
  padding: 8px 0px;
  border: none;
  border-bottom: 2px solid #ddd;
  cursor: pointer;
  transition: var(--transition);

  &:active,
  &:focus,
  &:hover {
    border-bottom: 2px solid var(--primary-color);
  }
`;

export default Input;
