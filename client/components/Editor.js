import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import rehypeSanitize from "rehype-sanitize";

import { onImagePasted } from "@/lib/apis/images";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

/**
 * * 마크다운 에디터
 * @param {Object} props
 * @param {String} props.value
 * @param {Function} props.onChange
 * @param {Function} props.setUploadImagesData - 업로드할 이미지 정보 setState
 * @returns {JSX.Element}
 */
export default function Editor({ ...props }) {
  return (
    <div data-color-mode="dark">
      <MDEditor
        value={props.value}
        onChange={props.onChange}
        height={props.height}
        previewOptions={{
          rehypePlugins: [[rehypeSanitize]],
        }}
        onPaste={async (e) =>
          await onImagePasted(e.clipboardData, props.onChange)
        }
        onDrop={async (e) =>
          await onImagePasted(e.dataTransfer, props.onChange)
        }
      />
    </div>
  );
}
