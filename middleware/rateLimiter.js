const rateLimit = require('express-rate-limit');


const limiter = (max) => rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: max,
    message: 'Too many requests from this IP, please try again after an hour'
    });

module.exports = limiter;