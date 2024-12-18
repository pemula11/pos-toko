class ExpressError extends Error {
    constructor(message, statusCode, status = 'error') {
        super(message);
        this.status = status;
        this.message = message;
        this.statusCode = statusCode;
       // Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = ExpressError;