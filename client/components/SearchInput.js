import { useEffect } from "react";

import Input from "./Input";
import useFirstRender from "@/lib/hooks/useFirstRender";

/**
 * * 검색용 input
 * @param {Object} props
 * @param {String} props.type
 * @param {String} props.name
 * @param {String} props.placeholder
 * @param {Object} props.style
 * @param {String} props.border - 테두리방향 (all, top, bottom, left, right)
 * @param {Function} props.onFocus - onFocus 이벤트
 * @param {Function} props.searchFunc
 * @param {String} props.defaultValue
 * @param {Function} props.setDefaultValue
 * @returns {JSX.Element}
 */
export default function SearchInput({ ...props }) {
  const firstRender = useFirstRender();

  let value, setValue;
  if (
    (props.defaultValue || props.defaultValue === "") &&
    props.setDefaultValue &&
    typeof props.setDefaultValue === "function"
  ) {
    value = props.defaultValue;
    setValue = props.setDefaultValue;
  } else {
    return console.error("<SearchInput> 검색어 state가 없습니다.");
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof props.searchFunc === "function" && !firstRender)
        props.searchFunc(value);
    }, 300);

    return () => clearTimeout(timer);
  }, [value]);

  return (
    <Input
      {...props}
      onChange={(event) => setValue(event.target.value)}
      onKeyUp={(event) => setValue(event.target.value)}
      defaultValue={value}
    />
  );
}
