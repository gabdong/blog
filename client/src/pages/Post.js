import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getPost } from "../apis/posts";

function Posts() {
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
    <>
      <h2 className="headline">{subject}</h2>
      <div>{content}</div>
    </>
  );
}

export default Posts;
