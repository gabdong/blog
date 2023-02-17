import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Viewer } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import codeSyntax from "@toast-ui/editor-plugin-code-syntax-highlight";
import "@toast-ui/editor/dist/i18n/ko-kr";

import Prism from "prismjs";
import "prismjs/themes/prism.css";
import "prismjs/components/prism-clojure";

import { getPost } from "../apis/posts";

function Post() {
  const params = useParams();
  const { postIdx } = params;
  const [loading, setLoading] = useState(true);
  const [postData, setPostData] = useState({});

  let subject, content, idx, tags;
  if (!loading) {
    subject = postData[0].subject;
    content = postData[0].content;
    idx = postData[0].idx;
    tags = postData[0].tags;
  }

  useEffect(() => {
    (async function () {
      setPostData(await getPost(postIdx));
      setLoading(false);
    })();
  }, [postIdx]);

  return loading ? null : (
    <div className="scroll h100">
      <h2 className="headline mb20">{subject}</h2>
      <Viewer
        initialValue={content}
        plugins={[[codeSyntax, { highlighter: Prism }]]}
      />
    </div>
  );
}

export default Post;
