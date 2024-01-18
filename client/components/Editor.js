import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import rehypeSanitize from "rehype-sanitize";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

/**
 * * 마크다운 에디터
 * @param {Object} props
 * @param {String} props.value
 * @param {Function} props.onChange
 * @returns {JSX.Element}
 */
export default function Editor({ ...props }) {
  return (
    <div data-color-mode="dark">
      <MDEditor
        {...props}
        previewOptions={{
          rehypePlugins: [[rehypeSanitize]],
        }}
      />
    </div>
  );
}
