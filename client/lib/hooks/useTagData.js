import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { getTagList } from "../apis/tags";

/**
 * * 태그정보를 가져오는 Hook - 태그변경사항 있을시 반영위해 memoization하지 않음
 * @returns {Object}
 */
export default function useTagData() {
  const router = useRouter();
  const { query } = router;
  const [tagData, setTagData] = useState({ tagList: {}, tagLoading: true });

  useEffect(() => {
    (async () => {
      const getTagListRes = await getTagList();
      const { data: tagDataRes } = getTagListRes;

      setTagData({
        tagList: tagDataRes.tagList,
        totalPostCnt: tagDataRes.totalPostCnt,
        privatePostCnt: tagDataRes.privatePostCnt,
        tagLoading: false,
        activeTagIdx: query.tagIdx,
      });
    })();
  }, [query]);

  return { tagData, setTagData };
}
