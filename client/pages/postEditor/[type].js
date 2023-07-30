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
// import { getPost } from "../apis/posts";
// import Button from "../components/Button/Button";
// import Input from "../components/Input/Input";
// import Radio from "../components/Radio/Radio";

export default function PostEditor() {
  const router = useRouter();
  const dispatch = useDispatch();
  // const [postType, setPostType] = useState();
  const { type: postType } = router.query;
  const user = useSelector((store) => store.user);

  useEffect(() => {
    (async () => {
      const userData = await checkLogin();

      if (userData && userData.isLogin) {
        dispatch(loginUser(userData));

        const getTagListRes = await getTagList();
      } else {
        router.push("/?tabItem=latestPostList");
      }
    })();
  }, []);

  return <div></div>;
}
