const express = require("express");
const router = express.Router();
const db = require("../config/db");
const { throwError } = require("../utils/utils");

//* 태그 리스트 요청
router.get("/", async (req, res) => {
  try {
    const [selectTagListRes] = await db.query(
      //* 태그리스트, 태그에 속한 게시글 갯수
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
    const [postCntRes] = await db.query(
      //* 전체 게시글, 비공개 게시글 갯수
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

  for (const tagName of tags) {
    try {
      const [selectTagNameRes] = await db.query(
        `
          SELECT idx, delete_datetime 
          FROM tags 
          WHERE name=?
      `,
        [tagName]
      );

      if (selectTagNameRes.length > 0) {
        const { idx: duplicateIdx, delete_datetime } = selectTagNameRes[0];

        if (delete_datetime !== null) {
          await db.query(
            `
            UPDATE tags SET
            delete_datetime=NULL
            WHERE idx=?
            `,
            [duplicateIdx]
          );
        }
      } else {
        await db.query(
          `
            INSERT INTO tags SET 
            auth=0, 
            member=?, 
            name=?
        `,
          [userIdx, tagName]
        );
      }
    } catch (err) {
      res.status(500).json({ msg: "태그 추가를 실패하였습니다." });
    }
  }

  res.json({ msg: "OK" });
});

//* 태그 수정
router.put("/:tagIdx", async (req, res) => {
  const { tagIdx } = req.params;
  const { name } = req.body;

  try {
    const [duplicateTagRes] = await db.query(
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
      await db.query(
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
    await db.query(
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
  let { searchWord } = req.query;
  searchWord = `%${searchWord}%`;

  try {
    //TODO 태그 사용권한 적용하기
    const [searchTagRes] = await db.query(
      `
      SELECT * 
      FROM tags 
      WHERE name LIKE ?
    `,
      [searchWord]
    );
    const searchTagData = searchTagRes[0];

    if (searchTagData.length === 0) throwError(404, "검색결과가 없습니다.");

    res.json({ msg: "OK", searchTagData });
  } catch (err) {
    res.status(err.status).json({ msg: err.message });
  }
});

module.exports = router;
