import { useRef } from "react";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/theme/toastui-editor-dark.css";
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import codeSyntax from "@toast-ui/editor-plugin-code-syntax-highlight";
import "@toast-ui/editor/dist/i18n/ko-kr";
import { Editor } from "@toast-ui/react-editor";

import Prism from "prismjs";
import "prismjs/themes/prism.css";
import "prismjs/components/prism-clojure";

function WritePost() {
  const toolbarItems = [
    ["heading", "bold"],
    ["hr"],
    ["ul", "ol", "task"],
    ["table", "link"],
    ["image"],
  ];
  const editorRef = useRef(null);
  const getMarkDown = () => {
    const data = editorRef.current.getInstance().getMarkdown();
  };

  return (
    <div className="markarea">
      <Editor
        previewStyle="vertical"
        height="calc(100vh - 10rem)"
        initialEditType="markdown"
        useCommandShortcut={false}
        plugins={[colorSyntax, [codeSyntax, { highlighter: Prism }]]}
        ref={editorRef}
        language="ko-KR"
        hideModeSwitch={true}
        onChange={getMarkDown}
        toolbarItems={toolbarItems}
        theme="dark"
      />
    </div>
  );
}

export default WritePost;
