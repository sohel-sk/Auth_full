const { register, login, checkVerification } = require('../controllers/AuthController');
const authMiddleware = require('../middleware/AuthMiddleware');
const express = require('express');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/verify/:token', checkVerification);

module.exports = router;