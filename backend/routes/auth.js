const { register, login, checkVerification, forgotPassword, resetPassword } = require('../controllers/AuthController');
const authMiddleware = require('../middleware/AuthMiddleware');
const express = require('express');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/verify/:token', checkVerification);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);

module.exports = router;