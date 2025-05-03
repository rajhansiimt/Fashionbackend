const path = require("path");
const multer = require("multer");
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3'); 
const multerS3 = require("multer-s3");

// Initialize the AWS S3 client
const s3Client = new S3Client({
  region: 'us-east-1', // Specify your AWS region here
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

// Create the uploadFile function
const uploadFile = (fieldName) => {
  console.log("Upload Type Received:", fieldName); // Debugging log

  const bucketName = "fetch-delivery"; // Make sure this is the correct bucket name

  const fileStorage = multerS3({
    s3: s3Client, // Using the new S3 Client (v3)
    bucket: bucketName,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: (req, file, cb) => {
      cb(null, {
        fileName: file.originalname,
        mimetype: file.mimetype,
      });
    },
    key: (req, file, cb) => {
      const uploadedFileName = `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`;
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
