const  profile  = require('../controllers/UserController');
const AuthMiddleware = require('../middleware/AuthMiddleware');
const express = require('express');
const router = express.Router();


router.get('/data', AuthMiddleware, profile);

module.exports = router;