const path = require("path");
const multer = require("multer");
const aws = require("aws-sdk");
const multerS3 = require("multer-s3");


const s3 = new aws.S3();

// Create the uploadFile function
const uploadFile = (fieldName) => {
  console.log("Upload Type Received:", fieldName); // Debugging log

  const bucketName = "fetch-delivery"; // Make sure this is the correct bucket name

  const fileStorage = multerS3({
    s3,
    bucket: bucketName,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: (req, file, cb) => {
      cb(null, {
        fileName: file.originalname,
        mimetype: file.mimetype,
      });
    },
    key: (req, file, cb) => {
      const uploadedFileName = `${file.fieldname}-${Date.now()}${path.extname(
        file.originalname
      )}`;
      console.log("Generated File Name:", uploadedFileName); // Debugging log
      cb(null, uploadedFileName);
    },
  });
  

  return multer({ storage: fileStorage }).fields([
    { name: 'mainImage', maxCount: 1 },
    { name: 'subImage', maxCount: 1 }
  ]);
};

// Export the uploadFile function
module.exports = { uploadFile };
