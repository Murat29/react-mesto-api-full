const router = require('express').Router();
const {
  getCards, createCard, deleteCard, deleteLike, createLike,
} = require('../controllers/cards');

router.get('/cards', getCards);
router.post('/cards', createCard);
router.delete('/cards/:_id', deleteCard);
router.delete('/cards/:cardId/likes', deleteLike);
router.put('/cards/:cardId/likes', createLike);

module.exports = router;
