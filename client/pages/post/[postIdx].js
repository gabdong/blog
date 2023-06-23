import { getPost } from "@/apis/posts";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import removeMd from "remove-markdown";

export default function Post() {
  const router = useRouter();
  const { postIdx } = router.query;

  const [postData, setPostData] = useState({});
  const [loading, setLoading] = useState(true);

  /**
   * * 게시글 정보 불러오는 함수
   */
  const getPostData = async () => {
    setPostData(await getPost(postIdx));
    setLoading(false);
  };

  if (!loading) {
    //* markdown 문법 제거
    postData.removeMdContent = removeMd(
      postData.content.replace(/<\/?[^>]+(>|$)/g, "")
    );

    if (postData.removeMdContent.length > 200)
      postData.removeMdContent = postData.removeMdContent.substring(0, 200);
  }

  useEffect(() => {
    if (postIdx) getPostData();
  }, [postIdx]);

  return loading ? null : (
    <>
      <div></div>
    </>
  );
}
