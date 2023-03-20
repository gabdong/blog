import styled from "styled-components";

function TabItem({ component, active = false, style = {}, value }) {
  return (
    <TabItemSt
      className={`tabItem ${active ? "active" : ""}`}
      style={style}
      data-value={value}
    >
      {component}
    </TabItemSt>
  );
}

const TabItemSt = styled.article`
  display: none;

  &.active {
    display: inherit;
  }
`;

export default TabItem;
