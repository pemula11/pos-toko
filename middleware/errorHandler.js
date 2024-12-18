const ExpressError = require('../utils/ExpressError');

function errorHandler (err, req, res, next) {
   // console.error(err.stack);
    
    if (err instanceof ExpressError){
      return  res.status(err.statusCode ).json({
            status: err.status,
            message: err.message,
          });
    }

   // console.error(err);
   console.error(err);
    res.status(500).json({
        status: 'error',
        message: 'Server Error'
    });


}

module.exports = errorHandler;