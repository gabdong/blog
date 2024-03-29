import { NavLink } from "react-router-dom";

/**
 * @param {String} name: 탭버튼 name
 * @param {Number} index: 탭버튼 순서 index
 * @param {Number} tabCnt: 탭 총 갯수
 * @param {String} path: 버튼 path
 * @param {String} location: 현재 path
 */
function TabButton({ name, index, tabCnt, path, location }) {
  /**
   * * tab
   * @param {Event} e
   */
  const tabFn = (e) => {
    const btn = e.currentTarget;
    const tab = btn.closest(".tab");
    const border = tab.querySelector(".tabBorder");

    //* 탭 하단 border위치이동
    border.style.left = `${(100 / tabCnt) * index}%`;
  };

  return (
    <NavLink
      className={() => {
        let className = "tabBtn";
        if (location === path) className += ' active';

        return className;
      }}
      onClick={tabFn}
      to={path}
    >
      {name}
    </NavLink>
  );
}

export default TabButton;
