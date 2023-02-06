require("dotenv").config();
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const db = require("../config/db");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

//* 게시판 추가
router.post("/", (req, res) => {
  const { parentIdx: parent, depth, position } = req.body;

  db.query(
    `INSERT INTO boards SET 
    depth=${depth},
    parent=${parent}, 
    title='새로운 게시판', 
    position=${position}, 
    auth=0`,
    (err, data) => {
      if (err)
        return res.status(500).json({ msg: "게시판 추가를 실패하였습니다." });

      const { insertId } = data;

      res.json({ msg: "SUCCESS", newIdx: insertId });
    }
  );
});

//* 게시판 리스트 요청
router.get("/", (req, res) => {
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

      res.json({ msg: "SUCCESS", boardData });
    }
  );
});

//* 게시판 수정
router.post("/:idx", (req, res) => {
  const { idx } = req.params;
  const { title, parent } = req.body;

  db.query(
    // 삭제된 게시판중 변경하려는 제목과 같은 게시판이있을경우 재사용
    `SELECT idx FROM boards 
    WHERE parent=${parent} 
    AND title='${title}' 
    AND delete_datetime IS NOT NULL`,
    (err, data) => {
      if (err)
        return res
          .status(500)
          .json({ msg: "게시판 중복확인을 실패하였습니다." });

      let targetIdx = idx;
      if (data.length > 0) {
        targetIdx = data[0].idx;

        db.query(
          `DELETE FROM boards 
          WHERE idx=${idx}`,
          (err, data) => {
            if (err)
              return res
                .status(500)
                .json({ msg: "중복 게시판 제거를 실패하였습니다." });
          }
        );
      }

      let updateQuery = "";

      if (title) updateQuery = `title='${title}'`;

      if (!updateQuery)
        return res.status(204).json({ msg: "수정사항이 없습니다." });

      db.query(
        `UPDATE boards SET 
        delete_datetime=NULL, 
        ${updateQuery} 
        WHERE idx=${targetIdx}`,
        (err, data) => {
          if (err)
            return res
              .status(500)
              .json({ msg: "게시판 수정을 실패하였습니다." });

          res.json({ msg: "SUCCESS" });
        }
      );
    }
  );
});

//* 게시판 제거
router.delete("/:idx", (req, res) => {
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

//* 게시판 정보 요청
router.get("/:idx", (req, res) => {
  const { idx } = req.params;

  db.query(
    `SELECT title, parent 
    FROM boards 
    WHERE idx=${idx} 
    AND delete_datetime IS NULL`,
    (err, data) => {
      if (err)
        return res
          .status(500)
          .json({ msg: "게시판 정보 불러오기를 실패하였습니다." });

      //TODO 없을경우 404
      res.json({ msg: "SUCCESS", boardData: data[0] });
    }
  );
});

//* depth1 게시판 리스트 요청
router.get("/list/firstDepth", (req, res) => {
  db.query(
    `SELECT idx, title 
    FROM boards 
    WHERE depth=1 
    AND delete_datetime IS NULL`,
    (err, data) => {
      if (err)
        return res
          .status(500)
          .json({ msg: "1차 게시판 리스트 불러오기를 실패하였습니다." });

      res.json({ msg: "SUCCESS", boardData: data });
    }
  );
});

//* 하위 게시판리스트 요청
router.get("/list/childBoard/:parentBoardIdx", (req, res) => {
  const { parentBoardIdx } = req.params;

  db.query(
    `SELECT idx, title 
  FROM boards 
  WHERE parent=${parentBoardIdx} 
  AND delete_datetime IS NULL`,
    (err, data) => {
      if (err)
        return res
          .status(500)
          .json({ msg: "하위 게시판 리스트 불러오기를 실패하였습니다." });

      res.json({ msg: "SUCCESS", boardData: data });
    }
  );
});

module.exports = router;
