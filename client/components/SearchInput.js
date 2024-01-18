import { useEffect, useState } from "react";
import Input from "./Input";

/**
 * * 검색용 input
 * @param {Object} props
 * @param {String} props.type
 * @param {String} props.name
 * @param {String} props.placeholder
 * @param {Object} props.style
 * @param {String} props.border - 테두리방향 (all, top, bottom, left, right)
 * @param {Function} props.searchFunc
 * @returns {JSX.Element}
 */
export default function SearchInput({ ...props }) {
  const [value, setValue] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof props.searchFunc === "function") props.searchFunc(value);
    }, 500);

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
