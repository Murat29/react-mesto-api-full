const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routeCards = require('./routes/cards.js');
const routeUsers = require('./routes/users.js');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// захардкореный идентификатор тестового пользователя
app.use((req, res, next) => {
  req.user = {
    _id: '601eb6a31ec2fc32743c39be',
  };

  next();
});
app.use('/', routeCards);
app.use('/', routeUsers);
app.use((req, res) => res.status(404).send({ message: 'Запрашиваемый ресурс не найден' }));

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
