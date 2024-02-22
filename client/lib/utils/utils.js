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

/**
 * * textarea 중간에 문자 넣어주는 함수
 * @param {String} id - textarea id
 * @param {String} intsertString
 * @returns {String}
 */
export function insertToTextArea(id, intsertString) {
  const textarea = document.getElementById(id);
  if (!textarea) {
    return null;
  }

  let sentence = textarea.value;
  const len = sentence.length;
  const pos = textarea.selectionStart;
  const end = textarea.selectionEnd;

  const front = sentence.slice(0, pos);
  const back = sentence.slice(pos, len);

  sentence = front + intsertString + back;

  textarea.value = sentence;
  textarea.selectionEnd = end + intsertString.length;

  return sentence;
}
