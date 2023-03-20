import styled from "styled-components";

function TabButton({ name, value, active = false, index, tabCnt }) {
  /**
   * * tab
   * @param {Event} e
   */
  const tabFn = (e) => {
    const btn = e.currentTarget;
    const tab = btn.closest(".tab");
    const tabItem = document.querySelector(`.tabItem[data-value="${value}"]`);
    const selectedItem = tab.querySelector(".tabItem.active");
    const border = tab.querySelector(".tabBorder");

    if (selectedItem && tabItem !== selectedItem) {
      //* 탭 display 조절
      const selectedBtn = tab.querySelector(".tabBtn.active");
      btn.classList.add("active");
      tabItem.classList.add("active");
      selectedBtn.classList.remove("active");
      selectedItem.classList.remove("active");

      //* 탭 하단 border위치이동
      border.style.left = `${(100 / tabCnt) * index}%`;
    }
  };

  return (
    <TabButtonSt
      className={`tabBtn ${active ? "active" : ""}`}
      data-value={value}
      onClick={tabFn}
    >
      <p className="title">{name}</p>
    </TabButtonSt>
  );
}

const TabButtonSt = styled.div`
  flex: 1;

  padding: 0 0 8px 0;
  text-align: center;
  cursor: pointer;
  transition: var(--transition);

  &.active,
  &:hover {
    color: var(--primary-color);
  }
`;

export default TabButton;
