const express = require('express');
const multer = require('multer');
const path = require('path');
const { getAllCitizens, saveCitizen } = require('../app/http/controllers/CitizenController');
const tryCatchHelper = require('../app/helpers/tryCatch');
const middlewares = require("../middlewares")


const router = express.Router();

 
router.get('/', tryCatchHelper(getAllCitizens));
router.post('/citizens',
   middlewares.handleUpload.fields([
    { name: 'passport_photograph', maxCount: 1 },
    { name: 'utility_bill', maxCount: 1 }]),
  tryCatchHelper(saveCitizen)
);



module.exports = router;