const express = require("express");
const router = express.Router();
const imageUploaderFn = require("../utils/imageUploader");
const { imageUploader } = imageUploaderFn;

//* 중복된 이미지 확인
router.get("/", async (req, res) => {
  const { name, size } = req.query;

  try {
    const [duplicatedImgRes] = await req.db.query(
      `
      SELECT url, alt, idx 
      FROM images 
      WHERE original_name=? 
      AND size=? 
    `,
      [name, size]
    );

    let url, alt, idx;

    if (duplicatedImgRes.length > 0) {
      url = duplicatedImgRes[0].url;
      alt = duplicatedImgRes[0].alt;
      idx = duplicatedImgRes[0].idx;
    }

    res.json({ msg: "OK", url, alt, idx });
  } catch (err) {
    res.status(500).json({ msg: "중복된 이미지검사를 실패하였습니다." });
  }
});

//* 이미지 업로드
router.post("/", imageUploader.single("image"), async (req, res) => {
  const { alt, user: userDataStr } = req.body;
  const userData = JSON.parse(userDataStr);
  const { idx: userIdx } = userData;
  const { originalname, transforms } = req.file;
  const { size, contentType: mimetype, location, key } = transforms[0];
  const name = key.replace("images/", "");

  let mimetypeNum;
  switch (mimetype) {
    case "image/jpeg":
      mimetypeNum = 1;
      break;
    case "image/png":
      mimetypeNum = 2;
      break;
  }

  try {
    const [uploadImageRes] = await req.db.query(
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
      [userIdx, size, originalname, name, location, alt, mimetypeNum]
    );

    res.json({ msg: "OK", url: location, idx: uploadImageRes.insertId, alt });
  } catch (err) {
    res.status(500).json({ msg: "이미지 업로드를 실패하였습니다." });
  }
});

module.exports = router;
