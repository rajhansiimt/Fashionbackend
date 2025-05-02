const path = require("path");
const multer = require("multer");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const aws = require("aws-sdk");
const multerS3 = require("multer-s3");

// MIDDLEWARES
dotenv.config({ path: "./config.env" });

aws.config.update({
  secretAccessKey: process.env.NODE_ENV.Access_KEY,
  accessKeyId: process.env.NODE_ENV.SECRECT_KEY,
  region: process.env.NODE_ENV.S3BUSCKET,
});

// ========================
const filestorage = multer.diskStorage({
  destination: "./utility/uploads",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}--${file.originalname}`);
  },
});

const upload = multer({ storage: filestorage });
// ========================
/*const maxSize = 1  1000  1000;*/
let _fileStorage = (type) => {
  let bucketName = "";
  try {
    if (type === "file") {
      bucketName = process.env.NODE_ENV.S3BUSCKET;
    } else {
      return new Error("Invalid type for aws s3 service");
    }
    return multer({
      storage: multerS3({
        s3: s3,
        bucket: bucketName,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        metadata: function (req, file, cb) {
          //eslint-disable-inline
          cb(null, {
            fileName: file.originalname,
            mimetype: file.mimetype,
            /*fileSize: maxSize*/
          });
        },
        key: function (req, file, cb) {
          //eslint-disable-inine
          let uploadedFileName =
            file.fieldname + Date.now() + path.extname(file.originalname);
          cb(null, uploadedFileName);
        },
      }),
    });
  } catch (error) {
    return error;
  }
};

module.exports = upload;
