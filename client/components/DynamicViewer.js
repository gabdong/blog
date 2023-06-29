import { Viewer } from "@toast-ui/react-editor";
import Prism from "prismjs";
import "@toast-ui/editor/dist/i18n/ko-kr";
import "prismjs/themes/prism.css";
import "prismjs/components/prism-clojure";
import codeSyntax from "@toast-ui/editor-plugin-code-syntax-highlight";

export default function DynamicViewer({initialValue}) {
    return (
        <Viewer
            initialValue={initialValue}
            plugins={[[codeSyntax, { highlighter: Prism }]]}
        />
    );
}