import styled from "styled-components";

function TabButton({ name, value, active = false }) {
  /**
   * * tab
   * @param {Event} e
   */
  const tabFn = (e) => {
    const btn = e.currentTarget;
    const tab = btn.closest(".tab");
    const { value } = btn.dataset;
    const tabItem = document.querySelector(`.tabItem[data-value="${value}"]`);
    const selectedItem = tab.querySelector(".tabItem.active");

    if (selectedItem && tabItem !== selectedItem) {
      const selectedBtn = tab.querySelector(".tabBtn.active");
      btn.classList.add("active");
      tabItem.classList.add("active");
      selectedBtn.classList.remove("active");
      selectedItem.classList.remove("active");
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
  text-align: center;
  cursor: pointer;
  transition: var(--transition);

  &.active,
  &:hover {
    color: var(--primary-color);
  }
`;

export default TabButton;
