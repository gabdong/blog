import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

//* markdown editor
// import "@toast-ui/editor/dist/toastui-editor.css";
// import "@toast-ui/editor/dist/theme/toastui-editor-dark.css";
// import "tui-color-picker/dist/tui-color-picker.css";
// import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
// import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
// import codeSyntax from "@toast-ui/editor-plugin-code-syntax-highlight";
// import "@toast-ui/editor/dist/i18n/ko-kr";
// import { Editor } from "@toast-ui/react-editor";

//* editor theme
// import Prism from "prismjs";
// import "prismjs/themes/prism.css";
// import "prismjs/components/prism-clojure";

// import axios from "../utils/axios";
// import { uploadImage } from "../apis/images";
import { getTagList } from "@/lib/apis/tags";
import { checkLogin } from "@/lib/apis/tokens";
import { loginUser } from "@/store/modules/user";
import { ssrRequireAuthentication } from "@/lib/utils/utils";
import { getPost } from "@/lib/apis/posts";
// import { getPost } from "../apis/posts";
// import Button from "../components/Button/Button";
// import Input from "../components/Input/Input";
// import Radio from "../components/Radio/Radio";

export default function PostEditor() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { type: postType } = router.query;
  const user = useSelector((store) => store.user);

  //* varaiable
  const postIdx = router.query.post;

  //* state
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [selectedTag, setSelectedTag] = useState([]);

  /**
   * 제목, 내용, 태그 -> state
   */
  useEffect(() => {
    (async () => {
      if (!router.isReady) return;

      const userData = await checkLogin();

      if (userData && userData.isLogin) {
        dispatch(loginUser(userData));

        const getTagListRes = await getTagList();
        const { data: tagDataRes } = getTagListRes;

        if (postType === "edit") {
          const postDataRes = await getPost(Number(postIdx));

          setSubject(postDataRes.subject);
          setContent(postDataRes.content);
          setSelectedTag(postDataRes.tags);
          console.log(postDataRes);
        }

        console.log(tagDataRes);
      } else {
        //* 로그인 안했을경우 게시글 작성불가
        router.push("/?tabItem=latestPostList");
      }
    })();
  }, [router.isReady]);

  console.log(subject);
  console.log(content);
  console.log(selectedTag);

  return !router.isReady ? null : <div></div>;
}
