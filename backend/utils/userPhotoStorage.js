const multer = require("multer");

console.log(__dirname);

const userPhotoStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, __dirname + "/../images/products");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}--${file.originalname}`);
  },
});

const userPhotoUpload = multer({ userPhotoStorage });

module.exports = userPhotoUpload;
