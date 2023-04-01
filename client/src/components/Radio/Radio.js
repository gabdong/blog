import styled from "styled-components";

function Radio({ id, label, checked, value, setFn, name }) {
  return (
    <RadioWrapSt htmlFor={id}>
      <input
        type="radio"
        name={name}
        id={id}
        defaultChecked={checked}
        value={value}
        onChange={setFn}
      />
      <p className="normalText">{label}</p>
    </RadioWrapSt>
  );
}

const RadioWrapSt = styled.label`
  display: flex;
  align-items: center;
  gap: 6px;

  cursor: pointer;

  & .normalText {
    color: var(--gray-l);
  }

  & input:checked + .normalText {
    color: #ffffff;
  }
`;

export default Radio;
