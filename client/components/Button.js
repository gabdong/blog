import styled from "styled-components";

/**
 * * 버튼
 * @param {Object} props
 * @param {String} props.text
 * @param {String} props.classname
 * @param {String} props.as
 * @param {Object} props.style
 * @param {Function} props.onClick
 * @returns {JSX.Element}
 */
export default function Button({
  text,
  classname = "",
  as = "",
  style = {},
  onClick,
}) {
  return (
    <ButtonSt
      className={`${classname}`}
      as={as}
      style={style}
      onClick={onClick}
    >
      <span className="buttonText">{text}</span>
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
