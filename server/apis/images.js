const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const db = require("../config/db");
const imageUploader = require("../utils/imageUploader");

//* 중복된 이미지 확인
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
router.post("/", async (req, res) => {});

module.exports = router;
