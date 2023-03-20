var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
require("dotenv").config();

console.log(process.env.MONGODB_URI);

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');
var ordersRouter = require('./routes/orders');

var app = express();

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })

const db = mongoose.connection

db.once('open', _ => {
  console.log('Database connected')
})

db.on('error', err => {
  console.error('connection error:', err)
})


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/products', productsRouter);

module.exports = app;
