const express = require("express");
const router = express.Router();
const db = require("../config/db");
const { throwError } = require("../utils/utils.js");

//* 게시글 리스트 요청
router.get(["/list/:tagIdx", "/list"], async (req, res) => {
  const { tagIdx } = req.params;
  const paginationUsing = Boolean(req.query.paginationUsing);

  let tagCond = "";
  if (tagIdx !== "all") {
    if (tagIdx === "private") {
      tagCond = "AND public='N'";
    } else {
      tagCond = "AND public='Y' ";

      if (tagIdx && tagIdx !== "total")
        tagCond += `AND JSON_CONTAINS(tags, '${tagIdx}') `;
    }
  }

  let limitCond = "";
  if (req.query.page && req.query.limit) {
    const page = Number(req.query.page);
    const limit = Number(req.query.limit);
    const offset = (page - 1) * limit;

    limitCond = `LIMIT ${limit} OFFSET ${offset}`;
  }

  try {
    //* 페이지네이션 사용일때 전체갯수
    let totalCnt;
    if (paginationUsing) {
      const [totalCntRes] = await db.query(`
        SELECT COUNT(idx) as totalCnt 
        FROM posts 
        WHERE delete_datetime IS NULL 
        ${tagCond}
      `);
      totalCnt = totalCntRes[0].totalCnt;
    }

    const [postListRes] = await db.query(
      `
      SELECT idx, subject, content, thumbnail, datetime, tags 
      FROM posts 
      WHERE delete_datetime IS NULL 
      ${tagCond}
      ORDER BY datetime DESC, idx DESC 
      ${limitCond}
    `
    );

    res.json({ msg: "OK", postList: postListRes, totalCnt });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "게시글 리스트 불러오지 못했습니다." });
  }
});

//* 게시글 요청
router.get("/:postIdx", async (req, res) => {
  const { postIdx } = req.params;
  const { user } = req.query;

  try {
    const [postDataRes] = await db.query(
      `
      SELECT posts.subject, posts.content, posts.tags, posts.member AS memberIdx, posts.update_datetime AS updateDatetime, members.name AS memberName, posts.thumbnail, posts.public, posts.idx 
      FROM posts posts 
      INNER JOIN members members ON members.idx=posts.member
      WHERE posts.idx=? 
      AND posts.delete_datetime IS NULL
    `,
      [postIdx]
    );

    if (postDataRes.length === 0)
      throwError(404, "게시글 정보가 존재하지 않습니다.");

    const postData = postDataRes[0];

    //* 비공개 게시글 권한조회
    if (postData.public === "N" && !user.isLogin)
      throwError(401, "게시글 권한이 없습니다.");

    //* 게시글 태그정보
    const [tagDataRes] = await db.query(
      `
      SELECT * 
      FROM tags 
      WHERE idx IN (?)
      `,
      [postData.tags]
    );
    postData.tagData = tagDataRes ? tagDataRes : [];

    res.json({ msg: "OK", postData });
  } catch (err) {
    if (err.status) {
      res.status(err.status).json({ msg: err.message });
    } else {
      res.status(500).json({ msg: "게시글을 불러오지 못했습니다." });
    }
  }
});

//* 게시글 업로드 요청
router.post("/", async (req, res) => {
  const { content, subject, tags, user, thumbnail, thumbnailAlt, isPublic } =
    req.body;
  const userIdx = user.idx;

  try {
    const [insertPostRes] = await db.query(
      `
      INSERT INTO posts SET
      member=?, 
      auth=0, 
      subject=?, 
      content=?,
      tags=?,
      thumbnail=?,
      public=?
    `,
      [
        userIdx,
        subject,
        content.replace(/'/g, "\\'"),
        JSON.stringify(tags).replace(/"/g, ""),
        thumbnail,
        thumbnailAlt,
        isPublic,
      ]
    );

    res.json({ msg: "OK", postIdx: insertPostRes.insertId });
  } catch (err) {
    res.status(500).json({ msg: "게시판 업로드를 실패하였습니다." });
  }
});

//* 게시글 수정
router.put("/:postIdx", async (req, res) => {
  const { postIdx } = req.params;
  const { markDown, subject, tags, user, thumbnail, thumbnailAlt, publicPost } =
    req.body;
  const userIdx = user.idx;

  try {
    //TODO 권한수정
    await db.query(
      `
      UPDATE posts SET
      member=?, 
      auth=0, 
      subject=?, 
      content=?,
      tags=?,
      thumbnail=?,
      public=?
      WHERE idx=?
    `,
      [
        userIdx,
        subject,
        markDown.replace(/'/g, "\\'"),
        JSON.stringify(tags).replace(/"/g, ""),
        thumbnail,
        thumbnailAlt,
        publicPost,
        postIdx,
      ]
    );

    res.json({ msg: "OK" });
  } catch (err) {
    res.status(500).json({ msg: "게시글 수정을 실패하였습니다." });
  }
});

//* 게시글 삭제
router.delete("/:postIdx", async (req, res) => {
  const { postIdx } = req.params;

  try {
    await db.query(
      `
      UPDATE posts SET 
      delete_datetime=CURRENT_TIMESTAMP() 
      WHERE idx=?
    `,
      [postIdx]
    );

    res.json({ msg: "OK" });
  } catch (err) {
    res.status(500).json({ msg: "게시글 삭제를 실패하였습니다." });
  }
});

module.exports = router;
