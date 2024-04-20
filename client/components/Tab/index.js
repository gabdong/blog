import { useRouter } from "next/router";
import styled from "styled-components";

import TabButton from "@/components/Tab/TabButton";

export default function Tab({ tabBtnList = {}, tabItemList = {}, tabCnt }) {
  const router = useRouter();
  const { asPath } = router;
  const activeTab = router.query.tabItem || Object.keys(tabItemList)[0];
  const activeIndex = Object.keys(tabItemList).indexOf(activeTab);

  return (
    <TabSt tabBtnCnt={Object.keys(tabBtnList).length} className="tab">
      {/* //* Tab Button */}
      <TabButtonWrapSt className="tabBtnWrap">
        <TabButtonContainerSt>
          {Object.entries(tabBtnList).map((tabBtnListData, i) => {
            const [tabBtnValue, tabBtnData] = tabBtnListData;
            const { label, path } = tabBtnData;

            return (
              <TabButton
                key={tabBtnValue}
                name={label}
                index={i}
                tabCnt={tabCnt}
                path={path}
                location={`${asPath}`}
              />
            );
          })}
        </TabButtonContainerSt>

        {/* //* Tab Border */}
        <TabBorderSt
          className="tabBorder"
          style={{
            width: `${100 / tabCnt}%`,
            left: `${(100 / tabCnt) * activeIndex}%`,
          }}
        />
      </TabButtonWrapSt>

      {/* //* Tab Item */}
      <TabItemWrapSt className="tabItemWrap">
        {tabItemList[activeTab]()}
      </TabItemWrapSt>
    </TabSt>
  );
}

const TabSt = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;
const TabButtonWrapSt = styled.div`
  display: flex;
  flex-direction: column;

  position: relative;

  & .tabBtn {
    flex: 1;

    padding: 0 0 8px 0;
    text-align: center;
    cursor: pointer;
    transition: var(--transition);
  }
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
