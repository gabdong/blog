const express = require("express");
const router = express.Router();
const db = require("../config/db");
const imageUploader = require("../utils/imageUploader");

//* 중복된 이미지 확인
router.get("/", async (req, res) => {
  const { name, size } = req.query;

  try {
    const [duplicatedImgRes] = await db.query(
      `
      SELECT url, alt FROM images 
      WHERE original_name=? 
      AND size=? 
    `,
      [name, size]
    );

    let url, alt;

    if (duplicatedImgRes.length > 0) {
      url = duplicatedImgRes[0].url;
      alt = duplicatedImgRes[0].alt;
    }

    res.json({ msg: "OK", url, alt });
  } catch (err) {
    res.status(500).json({ msg: "중복된 이미지검사를 실패하였습니다." });
  }
});

//* 이미지 업로드
router.post("/", imageUploader.single("image"), async (req, res) => {
  const { alt, user: userDataStr } = req.body;
  const userData = JSON.parse(userDataStr);
  const { idx: userIdx } = userData;
  const { originalname, size, mimetype, location, key } = req.file;
  const name = key.replace("images/", "");

  try {
    await db.query(
      `
      INSERT INTO images SET
      member=?,
      size=?,
      original_name=?,
      name=?,
      url=?,
      alt=?,
      mime_type=?
    `,
      [userIdx, size, originalname, name, location, alt, mimetype]
    );

    res.json({ msg: "OK", url: location });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "이미지 업로드를 실패하였습니다." });
  }
});

module.exports = router;
