const router = require('express').Router();
const {
  getUsers, getUser, createUser, updateNameAndAboutUser, updateAvatarUsers,
} = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/:_id', getUser);
router.post('/users', createUser);
router.patch('/users/me', updateNameAndAboutUser);
router.patch('/users/me/avatar', updateAvatarUsers);

module.exports = router;
