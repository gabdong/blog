import { createPortal } from "react-dom";

export default function Modal({component}) {
    if (typeof window === "undefined") return <></>;

    return createPortal(component, document.getElementById('modal'));
}