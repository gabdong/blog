import { useRouter } from "next/router";

import PostList from "@/components/PostList";

export default function Tag() {
  const router = useRouter();
  const { page, tagIdx } = router.query;

  return (
    <>
      {!page || !tagIdx ? null : (
        <PostList tagIdx={tagIdx} page={Number(page)} limit={9} />
      )}
    </>
  );
}
