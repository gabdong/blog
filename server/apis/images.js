const express = require("express");
const router = express.Router();
const db = require("../config/db");
const imageUploader = require("../utils/imageUploader");

//* 중복된 이미지 확인
//TODO 작업하기
router.get("/", async (req, res) => {
  const { name, size } = req.query;

  try {
    const [duplicatedImgRes] = await db.query(`
      SELECT url, alt FROM images 
      WHERE org_name='${name}'
      AND size=${size}
    `);

    res.json({ msg: "SUCCESS" });
  } catch (err) {
    throw new Error(err);
  }
});

//* 이미지 업로드
router.post("/", imageUploader.single("image"), async (req, res) => {
  const { alt } = req.body;
  const { originalname, size, contentType, location, key } = req.file;

  console.log(req.body);
  console.log(req.file);
  console.log(alt);
  res.json({ msg: "SUCCESS" });
});

module.exports = router;
