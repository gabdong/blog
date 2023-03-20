import styled from "styled-components";

function TabButton({ name, value }) {
  return <TabButtonSt className="tabBtn title">{name}</TabButtonSt>;
}

const TabButtonSt = styled.div`
  flex: 1;
  text-align: center;
  cursor: pointer;
  transition: var(--transition);

  &.active,
  &:hover {
    color: var(--primary-color);
  }
`;

export default TabButton;
