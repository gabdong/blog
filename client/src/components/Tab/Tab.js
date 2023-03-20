import styled from "styled-components";

import TabButton from "./TabButton";
import TabItem from "./TabItem";

function Tab({ tabBtnList = {}, tabItemList = {}, tabCnt, activeIndex }) {
  return (
    <TabSt tabBtnCnt={Object.keys(tabBtnList).length} className="tab">
      {/* //* Tab Button */}
      <TabButtonWrapSt className="tabBtnWrap">
        <TabButtonContainerSt>
          {Object.entries(tabBtnList).map((tabBtnData, i) => {
            const [tabBtnValue, label] = tabBtnData;
            const active = activeIndex === i ? true : false;

            return (
              <TabButton
                key={tabBtnValue}
                name={label}
                value={tabBtnValue}
                active={active}
                tabCnt={tabCnt}
                index={i}
              />
            );
          })}
        </TabButtonContainerSt>

        {/* //* Tab Border */}
        {/* //TODO active index 구해서 left값 적용해놓기 */}
        <TabBorderSt
          className="tabBorder"
          style={{
            width: `${100 / tabCnt}%`,
            left: `${(100 / tabCnt) * activeIndex}`,
          }}
        />
      </TabButtonWrapSt>

      {/* //* Tab Item */}
      <TabItemWrapSt className="tabItemWrap">
        {Object.entries(tabItemList).map((tabItemData, i) => {
          const [tabItemValue, component] = tabItemData;
          const active = activeIndex === i ? true : false;

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

const TabSt = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const TabButtonWrapSt = styled.div`
  display: flex;
  flex-direction: column;

  position: relative;
`;
const TabButtonContainerSt = styled.div`
  display: flex;
  justify-content: center;
`;
const TabBorderSt = styled.div`
  border: 1px solid var(--primary-color);
  position: relative;
  transition: var(--transition);
`;
const TabItemWrapSt = styled.section``;

export default Tab;
