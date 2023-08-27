const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/auth');
const UserController = require('../controllers/UserController');

router.post('/register', UserController.registerUser);
router.post(';login', authenticate, authorize(['user', 'admin']), UserController.loginUser);
router.post('/logout', authenticate, UserController.logOutUser);
router.patch('/me', authenticate, UserController.updateUser);
router.delete('/me', authenticate, UserController.deleteUser);

module.exports = router;