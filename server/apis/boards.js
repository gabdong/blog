require("dotenv").config();
const express = require("express");
const apis = express();
const bodyParser = require("body-parser");
const db = require("../config/db");

apis.use(bodyParser.json());
apis.use(bodyParser.urlencoded({ extended: true }));

apis.post("/", (req, res) => {
  const { parentIdx, depth, position } = req.body;
  const parentCond = parentIdx ? `parent=${parentIdx},` : "";

  db.query(
    `INSERT INTO boards SET 
    depth=${depth},
    ${parentCond} 
    title='새로운 게시판', 
    position=${position}`,
    (err, data) => {
      if (err)
        return res.status(500).json({ msg: "게시판 추가를 실패하였습니다." });

      const { insertId } = data;

      res.json({ msg: "SUCCESS", newIdx: insertId });
    }
  );
});

//* 게시판 메뉴리스트 요청
apis.get("/", (req, res) => {
  db.query(
    `SELECT idx, depth, parent, position, auth, title 
    FROM boards 
    WHERE delete_datetime IS NULL 
    ORDER BY depth ASC`,
    (err, data) => {
      if (err)
        return res
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

//* 게시판 메뉴 수정
apis.post("/:idx", (req, res) => {
  const { idx } = req.params;
  const { title } = req.body;

  let updateQuery = "";

  if (title) updateQuery = `title='${title}'`;

  if (!updateQuery)
    return res.status(204).json({ msg: "수정사항이 없습니다." });

  db.query(
    `UPDATE boards SET 
    ${updateQuery} 
    WHERE idx=${idx}`,
    (err, data) => {
      if (err)
        return res.status(500).json({ msg: "게시판 수정을 실패하였습니다." });

      res.json({ msg: "SUCCESS" });
    }
  );
});

//* 게시판 메뉴 제거
apis.delete(`/:idx`, (req, res) => {
  const { idx } = req.params;

  db.query(
    `UPDATE boards SET 
    delete_datetime=CURRENT_TIMESTAMP() 
    WHERE idx=${idx}`,
    (err, data) => {
      if (err)
        return res.status(500).json({ msg: "게시판 제거를 실패하였습니다." });

      res.json({ msg: "SUCCESS" });
    }
  );
});

module.exports = apis;
