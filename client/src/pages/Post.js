import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
      <p style={{ wordBreak: "break-all" }}>{content}</p>
    </div>
  );
}

export default Post;
