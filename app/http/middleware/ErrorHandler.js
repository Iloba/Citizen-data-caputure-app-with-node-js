const multer = require('multer');
const errorHandler = (error, req, res, next) => {

    if(error instanceof multer.MulterError){
       return res.status(400).send(error.message);
    }

    return res.status(400).send(error.message);
}

module.exports = errorHandler;