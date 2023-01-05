require("dotenv").config();
const express = require("express");
const apis = express();
const bodyParser = require("body-parser");
const db = require("../config/db");

apis.use(bodyParser.json());
apis.use(bodyParser.urlencoded({ extended: true }));

/**
 * g 게시판 메뉴리스트 요청
 */
apis.get("/", (req, res) => {
  db.query(
    `SELECT map.board AS idx, map.position, board.title, board.depth, parent.idx AS parentIdx, parent_map.position AS parentPosition 
    FROM board_map map 
    INNER JOIN board board ON map.board=board.idx 
    LEFT JOIN board parent ON map.parent=parent.idx 
    LEFT JOIN board_map parent_map ON parent_map.board=parent.idx 
    WHERE map.delete_datetime IS NULL`,
    (err, data) => {
      if (err)
        res.status(500).json({ msg: "게시판 메뉴 요청을 실패하였습니다." });
      const returnData = [];
      for (const boardData of data) {
        const { idx, position, title, depth, parentIdx, parentPosition } =
          boardData;

        if (depth == 1) {
          returnData[position] = {
            idx,
            title,
            child: [],
          };
        } else {
          const parentData = returnData[parentPosition];

          if (parentIdx === parentData.idx) {
            parentData.child[position] = { idx, title };
          }
        }
      }

      res.json(returnData);
    }
  );
});

module.exports = apis;
