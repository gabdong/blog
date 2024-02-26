const { S3Client } = require("@aws-sdk/client-s3");
const multer = require("multer");
const multerS3 = require("multer-s3");
const path = require("path");

const s3 = new S3Client({
  region: process.env.AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY,
    secretAccessKey: process.env.AWS_S3_SECRET_KEY,
  },
});

const allowedExtensions = [".png", ".jpg", ".jpeg", ".gif"];

const imageUploader = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_S3_BUCKET,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (req, file, callback) => {
      const uploadDirectory = req.query.directory ?? "images";
      const extention = path.extname(file.originalname).toLowerCase();
      if (!allowedExtensions.includes(extention))
        return callback(new Error("wrong extension")); // 파일 확장자 확인

      callback(null, `${uploadDirectory}/${Date.now()}_${file.originalname}`);
    },
    acl: "public-read-write",
  }),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

module.exports = imageUploader;
