import Link from "next/link";

/**
 * * tab
 * @param {Object} data : { e, tabCnt, index }
 */
const tabFn = ({...data}) => {
  const btn = data.e.currentTarget;
  const tab = btn.closest(".tab");
  const border = tab.querySelector(".tabBorder");

  //* 탭 하단 border위치이동
  border.style.left = `${(100 / data.tabCnt) * data.index}%`;
};

/**
 * @param {String} name: 탭버튼 name
 * @param {Number} index: 탭버튼 순서 index
 * @param {Number} tabCnt: 탭 총 갯수
 * @param {String} path: 버튼 path
 * @param {String} location: 현재 path
 */
function TabButton({ name, index, tabCnt, path, location }) {
  return (
    <Link
      className={location === path ? `tabBtn active` : `tabBtn`}
      onClick={(e) => tabFn({e, tabCnt, index})}
      href={path}
      shallow={true}
    >
      {name}
    </Link>
  );
}

export default TabButton;
