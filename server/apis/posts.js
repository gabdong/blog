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
                  ? `INNER JOIN board_post_maps maps ON maps.board=boards.idx
                    INNER JOIN posts posts ON posts.idx=maps.post `
                  : `INNER JOIN boards child_boards ON child_boards.parent=boards.idx 
                    INNER JOIN board_post_maps maps ON maps.board=child_boards.idx
                    INNER JOIN posts posts ON posts.idx=maps.post `;

  const sql = `SELECT boards.title, posts.idx, posts.subject 
              FROM boards boards 
              ${joinCond}
              WHERE boards.idx=${boardIdx}`;

  db.query(sql, (err, data) => {
      if (err) console.log(err.sql);
      console.log(data);

      res.json({ msg: "SUCCESS", postList: data });
    }
  );
});

module.exports = router;
