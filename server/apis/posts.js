const express = require("express");
const router = express.Router();
const { throwError } = require("../utils/utils.js");

//* 게시글 리스트 요청
router.get(["/list/:tagIdx", "/list"], async (req, res) => {
  const { tagIdx } = req.params;
  const paginationUsing = Boolean(req.query.paginationUsing);

  let tagCond = "";
  if (tagIdx !== "all") {
    if (tagIdx === "private") {
      tagCond = "AND posts.public='N'";
    } else {
      tagCond = "AND posts.public='Y' ";

      if (tagIdx && tagIdx !== "total")
        tagCond += `AND JSON_CONTAINS(posts.tags, '${tagIdx}') `;
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
      const [totalCntRes] = await req.db.query(`
        SELECT COUNT(idx) as totalCnt 
        FROM posts 
        WHERE delete_datetime IS NULL 
        ${tagCond}
      `);
      totalCnt = totalCntRes[0].totalCnt;
    }

    const [postListRes] = await req.db.query(
      `
      SELECT posts.idx, posts.subject, posts.content, posts.datetime, posts.tags, images.url AS thumbnail, images.alt AS thumbnailAlt  
      FROM posts posts 
      LEFT JOIN images images 
        ON images.idx=posts.thumbnail 
      WHERE posts.delete_datetime IS NULL 
      ${tagCond}
      ORDER BY posts.datetime DESC, posts.idx DESC 
      ${limitCond}
    `
    );

    res.json({ msg: "OK", postList: postListRes, totalCnt });
  } catch (err) {
    res.status(500).json({ msg: "게시글 리스트 불러오지 못했습니다." });
  }
});

//* 게시글 요청
router.get("/:postIdx", async (req, res) => {
  const { postIdx } = req.params;
  const { user } = req.query;

  try {
    const [postDataRes] = await req.db.query(
      `
      SELECT 
        posts.subject, posts.content, posts.tags, posts.public, posts.idx, 
        posts.member AS memberIdx, 
        posts.update_datetime AS updateDatetime, 
        members.name AS memberName, 
        images.url AS thumbnail, 
        images.alt AS thumbnailAlt
      FROM posts posts 
      INNER JOIN members members 
        ON members.idx=posts.member
      LEFT JOIN images images 
        ON images.idx=posts.thumbnail 
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
    if (postData.tags.length > 0) {
      const [tagDataRes] = await req.db.query(
        `
        SELECT * 
        FROM tags 
        WHERE idx IN (?)
        `,
        [postData.tags]
      );
      postData.tagData = tagDataRes ? tagDataRes : [];
    }

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
  const {
    postData: { content, subject, tags, thumbnail, isPublic },
    user,
  } = req.body;
  const userIdx = user.idx;

  try {
    const [insertPostRes] = await req.db.query(
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
  const {
    postData: { content, subject, tags, thumbnail, isPublic },
    user,
  } = req.body;
  const userIdx = user.idx;

  try {
    //TODO 권한수정
    const [editPostRes] = await req.db.query(
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
        content.replace(/'/g, "\\'"),
        JSON.stringify(tags).replace(/"/g, ""),
        thumbnail,
        isPublic,
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
    await req.db.query(
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
