const express = require('express');
const multer = require('multer');
const path = require('path');
const { getAllCitizens, saveCitizen } = require('../app/http/controllers/CitizenController');
const tryCatchHelper = require('../app/helpers/tryCatch');


const router = express.Router();



const storage = multer.diskStorage({
    // destination: './public/uploads/passport_photograph',
    destination: (req, file, cb) => {
        let uploadPath = './public/uploads/';
        if (file.fieldname === 'passport_photograph') {
          uploadPath += 'passport_photograph';
        } else if (file.fieldname === 'utility_bill') {
          uploadPath += 'utility_bill';
        }
        cb(null, uploadPath); // Specify the destination directory for the uploaded files
      },
    filename: (req, file, callback) => {
        // const fileNameToStore = ;
        return callback(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
});


const upload = multer({
    storage: storage,
    limits: { fileSize: 3 * 1024 * 1024 }
});

const uploadFields = [
    { name: 'passport_photograph', maxCount: 1 },
    { name: 'utility_bill', maxCount: 1 }
];

router.get('/', tryCatchHelper(getAllCitizens));
router.post('/citizens', upload.fields(uploadFields), tryCatchHelper(saveCitizen));



module.exports = router;