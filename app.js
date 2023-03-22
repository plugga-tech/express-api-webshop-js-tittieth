const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors')
require("dotenv").config();

console.log(process.env.MONGODB_URI);

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');
const ordersRouter = require('./routes/orders');
const categoriesRouter = require('./routes/categories');

const app = express();

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })

const db = mongoose.connection

db.once('open', _ => {
  console.log('Database connected')
})

db.on('error', err => {
  console.error('connection error:', err)
})

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/products', productsRouter);
app.use('/api/categories', categoriesRouter);

module.exports = app;
