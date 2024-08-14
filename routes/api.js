const express = require('express');
const multer = require('multer');
const path = require('path');
const { getAllCitizens, saveCitizen } = require('../app/http/controllers/CitizenController');
const tryCatchHelper = require('../app/helpers/tryCatch');
const {handleUpload: fileUploadHandler, uploadFields} = require("../file-upload-middlewares");


const router = express.Router();


 
router.get('/', tryCatchHelper(getAllCitizens));
router.post('/citizens', fileUploadHandler.fields(uploadFields),tryCatchHelper(saveCitizen));



module.exports = router;


