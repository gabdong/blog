import styled from "styled-components";

import TabButton from "./TabButton";

function Tab({ tabBtnList = {} }) {
  return (
    <TabSt tabBtnCnt={Object.keys(tabBtnList).length}>
      {Object.entries(tabBtnList).map((tabBtnData) => {
        const [tabBtnValue, tabBtnName] = tabBtnData;

        return (
          <TabButton key={tabBtnValue} name={tabBtnName} value={tabBtnValue}>
            {tabBtnName}
          </TabButton>
        );
      })}

      <TabBorderSt />
    </TabSt>
  );
}

const TabSt = styled.div`
  display: flex;
  justify-content: center;
`;
const TabBorderSt = styled.div``;

export default Tab;
