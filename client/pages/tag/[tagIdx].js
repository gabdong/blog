import { useRouter } from "next/router";

import PostList from "@/components/PostList";
import WithAuthorization from "@/components/WithAuthorization";

export default function Tag() {
  const router = useRouter();
  const { tagIdx, page } = router.query;

  return WithAuthorization(PostList)({ tagIdx, page });
}
