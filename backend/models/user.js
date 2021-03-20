const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /^(http|https):\/\/\S/.test(v);
      },
      message: 'Не правильная ссылка на аватарку!',
    },
  },
}, { versionKey: false });

module.exports = mongoose.model('user', userSchema);
