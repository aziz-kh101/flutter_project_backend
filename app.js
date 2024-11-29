var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();

require('dotenv').config();

// connect to MongoDB
const mongoose = require('mongoose');
mongoose.connect(process.env.CONNECT_DB_URI).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.log('Error:', error);
});



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const authRouter = require('./routes/auth');
const foodRouter = require('./routes/food');
const favoriteFoodRouter = require('./routes/favorite_food');
const userRouter = require('./routes/user');
const orderRouter = require('./routes/order');

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/foods', foodRouter);
app.use('/api/v1/favorite-foods', favoriteFoodRouter);
app.use('/api/v1/users', userRouter);
app.use("/api/v1/orders", orderRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // render the error page
  res.status(err.status || 500).send({
    message: err.message,
    error: err
  });
});

module.exports = app;
