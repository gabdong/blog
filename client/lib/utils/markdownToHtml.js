import { remark } from "remark";
import html from "remark-html";

/**
 * * 마크다운 문자열을 html로 변환해주는 함수
 * @param {String} markdown - 마크다운 문자열
 * @returns {String} html로 변경된 결과
 */
export default async function markdownToHtml(markdown) {
  const result = await remark().use(html).process(markdown);
  return result.toString();
}
