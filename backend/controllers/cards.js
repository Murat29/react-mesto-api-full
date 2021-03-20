const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => res.status(500).send({ message: err.message }));
};

// POST
module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') return res.status(400).send({ message: 'Переданы некорректные данные' });
      return res.status(500).send({ message: err.message });
    });
};

// DELETE
module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params._id)
    .then((card) => {
      if (!card) return res.status(404).send({ message: 'Такой карточки нет' });
      return res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Такой карточки нет' });
      }
      return res.status(500).send({ message: err.message });
    });
};

module.exports.deleteLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) return res.status(404).send({ message: 'Такой карточки нет' });
      return res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Такой карточки нет' });
      }
      return res.status(500).send({ message: err.message });
    });
};

// PUT
module.exports.createLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) return res.status(404).send({ message: 'Такой карточки нет' });
      return res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Такой карточки нет' });
      }
      return res.status(500).send({ message: err.message });
    });
};
