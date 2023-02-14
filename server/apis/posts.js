const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const db = require("../config/db");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

//* 게시글 리스트 요청
router.get("/list/:boardIdx", async (req, res) => {
  const { boardIdx } = req.params;
  const { parentBoardIdx } = req.query;

  try {
    let joinCond = "";
    let searchCond = "";
    if (parentBoardIdx) {
      searchCond = `AND posts.board=${boardIdx}`;
    } else {
      joinCond = `INNER JOIN boards boards ON boards.parent=${boardIdx}`;
      searchCond = "AND posts.board=boards.idx";
    }

    const [postListRes] = await db.query(`
      SELECT posts.idx, posts.subject, posts.update_datetime AS updateDatetime 
      FROM posts posts 
      ${joinCond}
      WHERE posts.delete_datetime IS NULL 
      ${searchCond}
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
router.post("/", (req, res) => {
  const { markDown, title, board, user } = req.body;

  console.log(markDown, title, board);
  db.query(
    `INSERT INTO posts 
    (member, subject, content) 
    VALUES
    (${user}, )`,
    (err, data) => {}
  );
  res.send("hi");
});

module.exports = router;
