const express = require("express");
const router = express.Router();
const { throwError } = require("../utils/utils");

//* 태그 리스트 요청
router.get("/", async (req, res) => {
  try {
    //* 태그리스트, 태그에 속한 게시글 갯수
    const [selectTagListRes] = await req.db.query(
      `
      SELECT tags.idx, tags.auth, tags.name, COUNT(posts.idx) AS postCnt 
      FROM tags tags 
      LEFT JOIN posts posts 
        -- //* tag에 속하면서 삭제되지않고 공개인 게시글
        ON JSON_CONTAINS(posts.tags, CAST(tags.idx AS char)) 
        AND posts.delete_datetime IS NULL 
        AND posts.public='Y'
      WHERE tags.delete_datetime IS NULL 
      GROUP BY tags.idx, tags.auth, tags.name
    `
    );

    //* 전체 게시글, 비공개 게시글 갯수
    const [postCntRes] = await req.db.query(
      `
      SELECT 
        COUNT(CASE WHEN public='Y' THEN 1 END) AS totalPostCnt,
        COUNT(CASE WHEN public='N' THEN 1 END) AS privatePostCnt
      FROM posts 
      WHERE delete_datetime IS NULL
    `
    );
    const { totalPostCnt, privatePostCnt } = postCntRes[0];

    const tagList = {};
    for (const tagData of selectTagListRes) {
      const { idx, auth, name, postCnt } = tagData;
      tagList[idx] = { auth, name, postCnt };
    }

    res.json({ msg: "OK", tagList, totalPostCnt, privatePostCnt });
  } catch (err) {
    res
      .status(500)
      .json({ msg: "태그리스트를 불러오지 못했습니다. (ERR_CODE: TAGS_01)" });
  }
});

//* 태그 추가
router.post("/", async (req, res) => {
  const { tags, user: userData } = req.body;
  const { idx: userIdx } = userData;

  const saveTagList = {};
  const errorList = []; // [{tagName, type}] - type 1: 중복, type 2: 쿼리에러
  for (const tagName of tags) {
    try {
      const [selectTagNameRes] = await req.db.query(
        `
          SELECT tags.idx AS duplicateTagIdx, tags.delete_datetime AS deleteDatetime, COUNT(posts.idx) AS postCnt, tags.auth 
          FROM tags tags
          LEFT JOIN posts posts 
            -- //* tag에 속하면서 삭제되지않고 공개인 게시글
            ON JSON_CONTAINS(posts.tags, CAST(tags.idx AS char)) 
            AND posts.delete_datetime IS NULL 
            AND posts.public='Y'
          WHERE UPPER(tags.name)=? 
          GROUP BY tags.idx
      `,
        [tagName.toUpperCase()]
      );

      // res.json({ msg: "ok" }); //TODO 지우기

      if (selectTagNameRes.length > 0) {
        //* 기존정보 있을경우
        const { duplicateTagIdx, deleteDatetime, postCnt, auth } =
          selectTagNameRes[0];

        if (deleteDatetime !== null) {
          //* 삭제된 태그정보 있을경우
          await req.db.query(
            `
            UPDATE tags SET
            delete_datetime=NULL
            WHERE idx=?
            `,
            [duplicateTagIdx]
          );
          saveTagList[duplicateTagIdx] = { name: tagName, auth, postCnt };
        } else {
          //* 중복일 경우
          errorList.push({ tagName, type: 1 });
        }
      } else {
        //* 기존정보 없을경우
        const [insertTagRes] = await req.db.query(
          `
            INSERT INTO tags SET 
            auth=0, 
            member=?, 
            name=?
        `,
          [userIdx, tagName]
        );

        const insertTagIdx = insertTagRes.insertId;
        saveTagList[insertTagIdx] = { name: tagName, auth: 0, postCnt: 0 };
      }
    } catch (err) {
      errorList.push({ tagName, type: 2 });
    }
  }

  res.json({ msg: "OK", saveTagList, errorList });
});

//* 태그 수정
router.put("/:tagIdx", async (req, res) => {
  const { tagIdx } = req.params;
  const { name } = req.body;

  try {
    const [duplicateTagRes] = await req.db.query(
      `
      SELECT idx 
      FROM tags 
      WHERE name=? 
      AND delete_datetime IS NULL
    `,
      [name]
    );

    if (duplicateTagRes.length > 0) {
      throwError(409, "중복된 태그명이 존재합니다.");
    } else {
      await req.db.query(
        `
        UPDATE tags SET 
        name=? 
        WHERE idx=?
      `,
        [name, tagIdx]
      );

      res.json({ msg: "OK" });
    }
  } catch (err) {
    if (err.status) {
      res.status(err.status).json({ msg: err.message });
    } else {
      res.status(500).json({ msg: "태그 수정을 실패하였습니다." });
    }
  }
});

//* 태그 삭제
router.delete("/:tagIdx", async (req, res) => {
  const { tagIdx } = req.params;

  try {
    await req.db.query(
      `
      UPDATE tags SET 
      delete_datetime=CURRENT_TIMESTAMP() 
      WHERE idx=?
    `,
      [tagIdx]
    );

    res.json({ msg: "OK" });
  } catch (err) {
    res.status(500).json({ msg: "태그 삭제를 실패하였습니다." });
  }
});

//* 태그검색
router.get("/searchTag", async (req, res) => {
  const { user } = req.query;
  let { searchWord, selectedTags } = req.query;
  searchWord = searchWord ? `%${searchWord}%` : searchWord;

  // 이미 선택된 태그는 검색제외
  const selectedTagsCond =
    Array.isArray(selectedTags) && selectedTags.length > 0
      ? `AND idx NOT IN (${selectedTags.join(",")})`
      : "";

  const sql = searchWord
    ? `
      SELECT * 
      FROM tags 
      WHERE delete_datetime IS NULL 
      AND name LIKE ?
      ${selectedTagsCond}
    `
    : `SELECT * 
      FROM tags 
      WHERE delete_datetime IS NULL 
      ${selectedTagsCond}
    `;

  const sqlParams = searchWord ? [searchWord] : [];

  try {
    //TODO 태그 사용권한 적용하기
    const [searchTagRes] = await req.db.query(sql, sqlParams);

    if (searchTagRes.length === 0) throwError(404, "검색결과가 없습니다.");

    res.json({ msg: "OK", searchTagData: searchTagRes });
  } catch (err) {
    res.status(err.status).json({ msg: err.message });
  }
});

module.exports = router;
