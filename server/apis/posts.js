const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const db = require("../config/db");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

//* 게시글 리스트 요청
router.get("/:boardIdx", (req, res) => {
  const { boardIdx } = req.params;
  const { parent } = req.query;
  
  const joinCond = parent 
                  ? `INNER JOIN board_post_maps maps ON maps.board=${boardIdx}
                  INNER JOIN boards boards ON boards.idx=maps.board `
                  : `INNER JOIN boards child_boards ON child_boards.parent=${boardIdx}
                  INNER JOIN board_post_maps maps ON maps.board=child_boards.idx `;

  const sql = `SELECT posts.idx, posts.subject 
              FROM posts posts 
              ${joinCond}
              WHERE posts.idx=maps.post`;

  db.query(sql, (err, data) => {
      if (err) console.log(err.sql);

      res.json({ msg: "SUCCESS", postList: data });
    }
  );
});

module.exports = router;
