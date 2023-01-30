const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const db = require("../config/db");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get("/:boardIdx", (req, res) => {
  const { boardIdx } = req.params;
  const { parent } = req.query;
  const joinCond = parent
    ? `INNER JOIN board_post_maps maps ON maps.board=${boardIdx}`
    : `INNER JOIN boards boards ON boards.parent=${boardIdx}
        INNER JOIN board_post_maps maps ON maps.board=boards.idx`;

  db.query(
    `SELECT posts.idx, posts.subject 
    FROM posts posts 
    ${joinCond}`,
    (err, data) => {
      if (err) console.log(err.sql);
      console.log(data);

      res.json({ msg: "SUCCESS", postList: data });
    }
  );
});

module.exports = router;
