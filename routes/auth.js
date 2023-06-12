const express = require('express');
const router = express.Router();
const authenticateUser = require('../middleware/authentication');

const {
  register,
  login,
  updateUser,
  deleteUser,
} = require('../controllers/auth');

router.post('/register', register);
router.post('/login', login);
router.patch('/updateUser', authenticateUser, updateUser);
router.delete('/', authenticateUser, deleteUser);

module.exports = router;
