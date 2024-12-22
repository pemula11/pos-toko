
require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');
const refreshTokenRouter = require('./routes/refreshToken');
const transactionsRouter = require('./routes/transaction');

const ExpressError = require('./utils/ExpressError');

const errorHandler = require('./middleware/errorHandler');
const verifyToken = require('./middleware/verifyToken');
const permissions = require('./middleware/permission');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/refresh_token', refreshTokenRouter);
app.use('/products', verifyToken, productsRouter);
app.use('/transactions', verifyToken, transactionsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(new ExpressError('Page Not Found', 404));
});

app.get('*', function(req,res, next) {
  next(new ExpressError('Page Not Found', 404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  
  errorHandler(err, req, res, next);

});



app.use(errorHandler);
  
module.exports = app;
