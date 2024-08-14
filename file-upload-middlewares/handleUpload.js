const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {

    let uploadPath = './public/uploads/';
    if (file.fieldname === 'utility_bill') {
      uploadPath += 'utility_bill';
    }
    if (file.fieldname === 'passport_photograph') {
      uploadPath += 'passport_photograph';
    }

    cb(null, uploadPath);
  },
  filename: (req, file, callback) => {

    callback(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 1024 }
})

let fields = [
  { name: 'passport_photograph', maxCount: 1 },
  { name: 'utility_bill', maxCount: 1 }
];

module.exports = {upload, fields};