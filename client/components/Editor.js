import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import rehypeSanitize from "rehype-sanitize";

import { uploadImage } from "@/lib/apis/images";
import { insertToTextArea } from "@/lib/utils/utils";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

/**
 * * 마크다운 에디터
 * @param {Object} props
 * @param {String} props.value
 * @param {Function} props.onChange - content setState
 * @returns {JSX.Element}
 */
export default function Editor({ ...props }) {
  /**
   * * 에디터 이미지 붙여넣기
   * @param {DataTransfer} dataTransfer
   */
  async function onImagePasted(dataTransfer) {
    const file_length = dataTransfer.files.length;
    for (let i = 0; i < file_length; i++) {
      const file = dataTransfer.files.item(i);

      if (file) {
        try {
          const { url, alt } = await uploadImage(file);
          const insertedMarkdown = insertToTextArea(
            ".w-md-editor-text-input",
            `![${alt ?? file.name}](${url})`
          );
          if (!insertedMarkdown) continue;
          props.onChange(insertedMarkdown);
        } catch (err) {}
      }
    }
  }

  return (
    <div data-color-mode="dark">
      <MDEditor
        value={props.value}
        onChange={props.onChange}
        height={props.height}
        previewOptions={{
          rehypePlugins: [[rehypeSanitize]],
        }}
        onPaste={async (e) => {
          if (e.clipboardData.files.length > 0) e.preventDefault();
          await onImagePasted(e.clipboardData);
        }}
      />
    </div>
  );
}
