import styled from "styled-components";

import TabButton from "./TabButton";
import TabItem from "./TabItem";

function Tab({ tabBtnList = {}, tabItemList = {} }) {
  return (
    <TabSt tabBtnCnt={Object.keys(tabBtnList).length} className="tab">
      {/* //* Tab Button */}
      <TabButtonWrapSt className="tabBtnWrap">
        {Object.entries(tabBtnList).map((tabBtnListData) => {
          const [tabBtnValue, tabBtnData] = tabBtnListData;
          const { label, active } = tabBtnData;

          return (
            <TabButton
              key={tabBtnValue}
              name={label}
              value={tabBtnValue}
              active={active}
            />
          );
        })}
        {/* //* Tab Border */}
        <TabButtonBorderSt />
      </TabButtonWrapSt>

      {/* //* Tab Item */}
      <TabItemWrapSt className="tabItemWrap">
        {Object.entries(tabItemList).map((tabItemListData) => {
          const [tabItemValue, tabItemData] = tabItemListData;
          const { component, active } = tabItemData;

          return (
            <TabItem
              key={tabItemValue}
              component={component()}
              active={active}
              value={tabItemValue}
            />
          );
        })}
      </TabItemWrapSt>
    </TabSt>
  );
}

const TabButtonWrapSt = styled.div`
  display: flex;
  justify-content: center;
`;
const TabSt = styled.div``;
const TabButtonBorderSt = styled.div``;
const TabItemWrapSt = styled.section``;

export default Tab;
