import { useRouter } from "next/router";
import { useState } from "react";

export default function PostEditor() {
  const router = useRouter();
  const [postType, setPostType] = useState();
  return <div></div>;
}
