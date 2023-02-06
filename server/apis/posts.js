const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const db = require("../config/db");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

//* 게시글 리스트 요청
router.get("/list/:boardIdx", (req, res) => {
  const { boardIdx } = req.params;
  const { parentBoardIdx } = req.query;

  const joinCond = parentBoardIdx
    ? `INNER JOIN board_post_maps maps ON maps.board=${boardIdx}
                  INNER JOIN boards boards ON boards.idx=maps.board `
    : `INNER JOIN boards child_boards ON child_boards.parent=${boardIdx}
                  INNER JOIN board_post_maps maps ON maps.board=child_boards.idx `;

  const sql = `SELECT posts.idx, posts.subject, posts.update_datetime AS updateDatetime
              FROM posts posts 
              ${joinCond}
              WHERE posts.idx=maps.post`;

  db.query(sql, (err, data) => {
    if (err)
      return res
        .status(500)
        .json({ msg: "게시글 리스트를 불러오지 못했습니다." });

    res.json({ msg: "SUCCESS", postList: data });
  });
});

//* 게시글 요청
router.get("/:postIdx", (req, res) => {
  const { postIdx } = req.params;

  db.query(
    `SELECT subject, content, idx, tags 
    FROM posts 
    WHERE idx=${postIdx}`,
    (err, data) => {
      if (err)
        return res.status(500).json({ msg: "게시글을 불러오지 못했습니다." });

      res.json({ msg: "SUCCESS", postData: data });
    }
  );
});

//* 게시글 업로드 요청
router.post("/", (req, res) => {
  const { markDown, title, board, user } = req.body;

  console.log(markDown, title, board);
  db.query(
    `INSERT INTO posts 
    SET 
  `,
    (err, data) => {}
  );
  res.send("hi");
});

module.exports = router;
