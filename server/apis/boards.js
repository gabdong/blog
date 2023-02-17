require("dotenv").config();
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const db = require("../config/db");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

//* 게시판 리스트 요청
router.get("/", async (req, res) => {
  try {
    const [data] = await db.query(`
      SELECT idx, depth, parent, position, auth, title 
      FROM boards 
      WHERE delete_datetime IS NULL 
      ORDER BY depth ASC
    `);

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
  } catch (err) {
    res.status(500).json({ msg: "게시판 리스트를 불러오지 못했습니다." });
  }
});

//* 게시판 추가
//TODO user 추가
router.post("/", async (req, res) => {
  const { parentIdx: parent, depth, position, user } = req.body;
  const { idx: userIdx } = user;

  try {
    const insertBoardRes = await db.query(`
      INSERT INTO boards SET
      depth=${depth},
      parent=${parent},
      title='새로운 게시판',
      position=${position},
      auth=0,
      member=${userIdx}
    `);

    const { insertId } = insertBoardRes[0];

    res.json({ msg: "SUCCESS", newIdx: insertId });
  } catch (err) {
    res.status(500).json({ msg: "게시판 추가를 실패하였습니다." });
  }
});

//* 게시판 수정
router.put("/:idx", async (req, res) => {
  const { idx } = req.params;
  const { title, parent } = req.body;

  try {
    //* 중복 게시판 검사
    const [selectBoardRes] = await db.query(`
      SELECT idx FROM boards
      WHERE parent=${parent}
      AND title='${title}'
      AND delete_datetime IS NOT NULL
    `);

    let updateQuery = "";

    //TODO 이외 수정사항 추가(권한 등)
    if (title) updateQuery += `title='${title}'`;

    if (!updateQuery)
      return res.status(204).json({ msg: "수정사항이 없습니다." });

    let targetIdx = idx;
    if (selectBoardRes.length !== 0) {
      //* 삭제된 게시판중 중복된 게시판이있을경우 재사용
      targetIdx = selectBoardRes[0].idx;

      await db.query(`
        DELETE FROM boards
        WHERE idx=${idx}
      `);
    }

    //* 게시판 업데이트
    await db.query(`
      UPDATE boards SET
      delete_datetime=NULL,
      ${updateQuery}
      WHERE idx=${targetIdx}
    `);

    res.json({ msg: "SUCCESS" });
  } catch (err) {
    //TODO error
    throw err;
  }
});

//* 게시판 제거
//TODO 게시글, 하위게시판 같이 제거할지
router.delete("/:idx", async (req, res) => {
  const { idx } = req.params;

  try {
    await db.query(`
      UPDATE boards SET
      delete_datetime=CURRENT_TIMESTAMP()
      WHERE idx=${idx}
    `);

    res.json({ msg: "SUCCESS" });
  } catch (err) {
    res.status(500).json({ msg: "게시판 제거를 실패하였습니다." });
  }
});

//* 게시판 정보 요청
router.get("/:idx", async (req, res) => {
  const { idx } = req.params;

  try {
    const boardRes = await db.query(`
      SELECT title, parent
      FROM boards
      WHERE idx=${idx}
      AND delete_datetime IS NULL
    `);

    if (boardRes.length === 0) {
      const err = new Error("게시판 정보를 불러오지 못했습니다.");
      err.statusCode(404);
      throw err;
    }

    res.json({ msg: "SUCCESS", boardData: boardRes[0] });
  } catch (err) {
    if (err.statusCode) {
      res.status(err.statusCode).json({ msg: err.message });
    } else {
      throw err;
    }
  }
});

//* depth1 게시판 리스트 요청
router.get("/list/firstDepth", async (req, res) => {
  try {
    const [boardListRes] = await db.query(`
      SELECT idx, title
      FROM boards
      WHERE depth=1
      AND delete_datetime IS NULL
    `);

    res.json({ msg: "SUCCESS", boardData: boardListRes });
  } catch (err) {
    res.status(500).json({ msg: "1차 게시판 리스트를 불러오지 못했습니다." });
  }
});

//* 하위 게시판리스트 요청
router.get("/list/childBoard/:parentBoardIdx", async (req, res) => {
  const { parentBoardIdx } = req.params;

  try {
    const [childBoardListRes] = await db.query(`
      SELECT idx, title
      FROM boards
      WHERE parent=${parentBoardIdx}
      AND delete_datetime IS NULL
    `);

    res.json({ msg: "SUCCESS", boardData: childBoardListRes });
  } catch (err) {
    res.status(500).json({ msg: "하위게시판 리스트를 불러오지 못했습니다." });
  }
});

module.exports = router;
