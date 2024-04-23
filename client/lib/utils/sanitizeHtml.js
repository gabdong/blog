import DOMPurify from "dompurify";
import { JSDOM } from "jsdom";

/**
 * * html 문자열을 html로 사용할때 XSS 공격방지하는 함수
 * @param {String} html
 * @returns {String}
 */
export default function sanitizeHtml(html) {
  return DOMPurify(new JSDOM("<!DOCTYPE html>").window).sanitize(html);
}
