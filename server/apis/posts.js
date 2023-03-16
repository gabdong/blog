const express = require("express");
const router = express.Router();
const db = require("../config/db");

//* 게시글 리스트 요청
router.get("/list/:tagIdx", async (req, res) => {
  const { tagIdx } = req.params;

  try {
    const [postListRes] = await db.query(
      `
      SELECT idx, subject, content, datetime 
      FROM posts 
      WHERE delete_datetime IS NULL 
      AND JSON_CONTAINS(tags, ?)
      ORDER BY datetime DESC
    `,
      [tagIdx]
    );

    res.json({ msg: "SUCCESS", postList: postListRes });
  } catch (err) {
    res.status(500).json({ msg: "게시글 리스트 불러오지 못했습니다." });
  }
});

//* 게시글 요청
router.get("/:postIdx", async (req, res) => {
  const { postIdx } = req.params;

  try {
    const [postDataRes] = await db.query(
      `
      SELECT posts.subject, posts.content, posts.tags, posts.member, posts.update_datetime AS updateDatetime, members.name 
      FROM posts posts 
      INNER JOIN members members ON members.idx=posts.member
      WHERE posts.idx=?
    `,
      [postIdx]
    );

    if (postDataRes.length === 0) {
      const err = new Error("게시글 정보가 존재하지 않습니다.");
      err.status = 404;

      throw err;
    }

    res.json({ msg: "SUCCESS", postData: postDataRes });
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
  const { markDown, subject, tags, user } = req.body;
  const userIdx = user.idx;

  try {
    const [insertPostRes] = await db.query(
      `
      INSERT INTO posts SET
      member=?, 
      auth=0, 
      subject=?, 
      content=?,
      tags=?
    `,
      [
        userIdx,
        subject,
        markDown.replace(/'/g, "\\'"),
        JSON.stringify(tags).replace(/"/g, ""),
      ]
    );

    res.json({ msg: "SUCCESS", postIdx: insertPostRes.insertId });
  } catch (err) {
    res.status(500).json({ msg: "게시판 업로드를 실패하였습니다." });
  }
});

module.exports = router;
