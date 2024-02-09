/**
 * * document 클릭시 상위에 id값을 가진 el이 없을경우 display 조절
 * @param {Array} idList
 * @param {String} targetId
 * @param {String} type
 * @param {Boolean} addEvent
 */
export function elDisplayToggle(
  idList = [],
  targetId = "",
  type = "remove",
  addEvent = true
) {
  idList = idList || [];
  targetId = targetId || "";
  type = type || "";
  addEvent = addEvent ?? true;

  /**
   * * display 조절해주는 함수
   * @param {Event} e
   */
  function _toggleFn(e) {
    e.preventDefault();
    e.stopPropagation();
    const target = document.getElementById(targetId);
    const current = e.target;

    let check = false;
    for (const id of idList) {
      if (current.closest(`#${id}`) || current.id === id) check = true;
    }

    if (!check) {
      if (type == "remove") {
        target.remove();
      } else {
        target.classList.remove(type);
      }

      document.removeEventListener("click", _toggleFn);
    }
  }

  if (addEvent) {
    document.addEventListener("click", _toggleFn);
  } else {
    document.removeEventListener("click", _toggleFn);
  }
}
