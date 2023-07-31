const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const app = express();

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

mongoose.connect('mongodb://localhost:27017/mestodb')
  .then(() => {
    console.log('connection successful');
  });

app.use(bodyParser.json());

app.use((req, res, next) => {
  req.user = {
    _id: '64c77a21e3197f01604d915d',
  };

  next();
});
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
app.use('*', (req, res) => {
  res.status(404).send({ message: 'Неверный адрес запроса' });
});

app.listen(PORT, () => {
  console.log('start');
});
