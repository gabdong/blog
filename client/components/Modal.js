import { createPortal } from "react-dom";

/**
 * * Modal Portal
 * @param {Object} props
 * @param {JSX.Element} props.component - 모달 컴포넌트
 * @param {Boolean} props.modalView - 모달 디스플레이여부
 * @return {JSX.Element}
 */
export default function Modal({ component, modalView }) {
  if (typeof window === "undefined") return <></>;

  // 모달 active시 scroll방지
  const body = document.querySelector("body");
  modalView
    ? body.classList.add("modalAcitve")
    : body.classList.remove("modalAcitve");

  return modalView ? (
    createPortal(component, document.getElementById("modal"))
  ) : (
    <></>
  );
}
