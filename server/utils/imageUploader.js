/**
 * TODO multer transform이 aws-sdk v3를 지원할때 마이그레이션하기
 */
// const { S3Client } = require("@aws-sdk/client-s3");
// const s3 = new S3Client({
//   region: process.env.AWS_S3_REGION,
//   credentials: {
//     accessKeyId: process.env.AWS_S3_ACCESS_KEY,
//     secretAccessKey: process.env.AWS_S3_SECRET_KEY,
//   },
// });

const multer = require("multer");
const multerS3 = require("multer-s3-transform");
const path = require("path");
const sharp = require("sharp");
const aws = require("aws-sdk");
const { throwError } = require("./utils");

aws.config.update({
  accessKeyId: process.env.AWS_S3_ACCESS_KEY,
  secretAccessKey: process.env.AWS_S3_SECRET_KEY,
  region: process.env.AWS_S3_REGION,
});

const allowedExtensions = [".png", ".jpg", ".jpeg", ".gif"];

/**
 * * S3 image uploader
 */
const imageUploader = multer({
  storage: multerS3({
    s3: new aws.S3(),
    bucket: process.env.AWS_S3_BUCKET,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    shouldTransform: (req, file, callback) => {
      // 이미지인경우 transforms 실행
      callback(null, /^image/i.test(file.mimetype));
    },
    transforms: [
      {
        // 이미지사이즈조절, 확장자 조절
        id: "imageConverter",
        key: (req, file, callback) => {
          const uploadDirectory = req.query.directory ?? "images";
          const extention = path.extname(file.originalname).toLowerCase();
          if (!allowedExtensions.includes(extention))
            return callback(throwError(415, "잘못된 확장자입니다.", true));

          callback(
            null,
            `${uploadDirectory}/${Date.now()}_${file.originalname}`
          );
        },
        transform: function (req, file, cb) {
          cb(
            null,
            sharp().jpeg({ mozjpeg: true }).resize(800).toFormat("jpeg")
          );
        },
      },
    ],
    acl: "public-read",
  }),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

module.exports = { imageUploader };
