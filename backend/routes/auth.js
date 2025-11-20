const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const { registerValidation, loginValidation } = require('../utils/validators');

router.post('/register', register);
router.post('/login', login);

module.exports = router;
