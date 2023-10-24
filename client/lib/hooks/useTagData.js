import { useEffect, useState } from "react";
import { getTagList } from "../apis/tags";

/**
 * * 태그정보를 가져오는 Hook
 * @param {Boolean} isReady 
 * @returns {Object}
 */
export default function useTagData(isReady) {
    const [tagData, setTagData] = useState({tagList: {}, tagLoading: true});
    const [tagLoading, setTagLoading] = useState(true);

    useEffect(() => {
        if (isReady) {
            (async () => {
                const getTagListRes = await getTagList();
                const { data: tagDataRes } = getTagListRes;
    
                setTagData({
                    tagList: tagDataRes.tagList,
                    totalPostCnt: tagDataRes.totalPostCnt,
                    privatePostCnt: tagDataRes.privatePostCnt
                });

                setTagLoading(false);
            })();
        }
    }, [isReady]);

    return { tagData, tagLoading };
}