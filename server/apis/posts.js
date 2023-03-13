const express = require("express");
const router = express.Router();
const db = require("../config/db");

//* 게시글 리스트 요청
router.get("/list/:tagIdx", async (req, res) => {
  const { tagIdx } = req.params;

  try {
    const [postListRes] = await db.query(`
      SELECT idx, subject, content, datetime 
      FROM posts
      WHERE delete_datetime IS NULL 
      AND JSON_CONTAINS(tags, '${tagIdx}')
      ORDER BY datetime DESC
    `);

    res.json({ msg: "SUCCESS", postList: postListRes });
  } catch (err) {
    if (err.statusCode) {
      res.status(err.statusCode).json({ msg: err.message });
    } else {
      res.status(500).json({ msg: "게시글 리스트 불러오지 못했습니다." });
    }
  }
});

//* 게시글 요청
router.get("/:postIdx", async (req, res) => {
  const { postIdx } = req.params;

  try {
    const [postDataRes] = await db.query(`
      SELECT subject, content, idx, tags 
      FROM posts 
      WHERE idx=${postIdx}
    `);

    if (postDataRes.length === 0) {
      const err = new Error("게시글을 불러오지 못했습니다.");
      err.statusCode(500);
    }

    res.json({ msg: "SUCCESS", postData: postDataRes });
  } catch (err) {
    if (err.statusCode) {
      res.status(err.statusCode).json({ msg: err.message });
    } else {
      throw err;
    }
  }
});

//* 게시글 업로드 요청
router.post("/", async (req, res) => {
  const { markDown, subject, board, user } = req.body;
  const userIdx = user.idx;

  //TODO board없애기
  try {
    const [insertPostRes] = await db.query(`
      INSERT INTO posts SET
      member=${userIdx}, 
      board=${board}, 
      auth=0, 
      subject='${subject}', 
      content='${markDown.replace(/'/g, "\\'")}',
      tags='[]'
    `);

    res.json({ msg: "SUCCESS", postIdx: insertPostRes.insertId });
  } catch (err) {
    res.status(500).json({ msg: "게시판 업로드를 실패하였습니다." });
  }
});

module.exports = router;
