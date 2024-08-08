const tryCatchHelper = (controller) => {
    return async function(req, res, next){
        try {
            await controller(req, res);
        } catch (error) {
            return next(error); 
        }
    }
}

module.exports = tryCatchHelper;