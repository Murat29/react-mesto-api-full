require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const { celebrate, Joi, errors } = require("celebrate");
const bodyParser = require("body-parser");
const cors = require("cors");
const routeCards = require("./routes/cards.js");
const routeUsers = require("./routes/users.js");
const { createUser, login } = require("./controllers/users");
const auth = require("./middlewares/auth");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const optionsCors = require("./сonstants/optionsCors");

const { PORT = 3000 } = process.env;
const app = express();
app.use(cors());

mongoose.connect("mongodb://localhost:27017/mestodb", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.post(
  "/signin",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(4),
    }),
  }),
  login
);

app.post(
  "/signup",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2),
      avatar: Joi.string().regex(/^(http|https):\/\/\S/),
      email: Joi.string().required().email(),
      password: Joi.string().required().min(4),
    }),
  }),
  createUser
);

app.use(auth);
app.use("/", routeCards);
app.use("/", routeUsers);

app.use(errorLogger);

app.use(errors());
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  if (err.name === "CastError" || err.name === "ValidationError") {
    return res.status(400).send({ message: err.message });
  }
  const { statusCode = 500, message } = err;

  return res.status(statusCode).send({
    message: statusCode === 500 ? "На сервере произошла ошибка" : message,
  });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
