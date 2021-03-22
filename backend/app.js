const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routeCards = require('./routes/cards.js');
const routeUsers = require('./routes/users.js');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/signin', login);
app.post('/signup', createUser);
app.use(auth);
app.use('/', routeCards);
app.use('/', routeUsers);
app.use((err, req, res, next) => {
  if (err.name === 'CastError') {
    return res.status(400).send({ message: 'Такого пользователя нет' });
  }
  if (err.name === 'ValidationError') return res.status(400).send({ message: 'Переданы некорректные данные' });
  res.status(500).send({ message: 'На сервере произошла ошибка' });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
