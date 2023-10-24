import { useState } from "react";

/**
 * * input value, handler 만들어주는 훅
 * @param {*} initialValue 
 * @returns {Array}
 */
export default function useInput(initialValue) {
    const [value, setValue] = useState(initialValue);
    const handler = (e) => {
        setValue(e.target.value);
    }

    return [value, handler];
}