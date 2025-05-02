const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const fs = require('fs');

// Create dynamic destination logic
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = 'uploads/others'; // default

    if (file.mimetype.startsWith('image/')) {
      folder = 'uploads/images';
    } else if (file.mimetype.startsWith('video/')) {
      folder = 'uploads/videos';
    }

    // Ensure the folder exists
    fs.mkdirSync(folder, { recursive: true });

    cb(null, folder);
  },

  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = crypto.randomBytes(16).toString('hex') + '-' + Date.now() + ext;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

module.exports = {
  upload
};
