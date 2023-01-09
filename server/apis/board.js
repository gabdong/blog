require("dotenv").config();
const express = require("express");
const apis = express();
const bodyParser = require("body-parser");
const db = require("../config/db");

apis.use(bodyParser.json());
apis.use(bodyParser.urlencoded({ extended: true }));

//* 게시판 메뉴리스트 요청
apis.get("/", (req, res) => {
  db.query(
    `SELECT idx, depth, parent, position, auth, title 
    FROM board 
    WHERE delete_datetime IS NULL 
    ORDER BY depth ASC`,
    (err, data) => {
      if (err)
        res
          .status(500)
          .json({ msg: "게시판 메뉴리스트 요청을 실패하였습니다." });

      const boardData = {};
      for (const menu of data) {
        const { idx, depth, parent, position, auth, title } = menu;

        if (depth === 1) {
          boardData[idx] = {
            position,
            auth,
            title,
            child: {},
            depth,
          };
        } else {
          const parentData = boardData[parent];

          if (parentData) {
            parentData.child[idx] = {
              parent,
              position,
              auth,
              title,
              depth,
            };
          }
        }
      }

      res.json(boardData);
    }
  );
});

module.exports = apis;
