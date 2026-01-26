const express = require('express');
const router = express.Router();
const { register, login, getCurrentUser } = require('../controllers/authController');
const { authenticateToken } = require('../middleware/authMiddleware');
const { validateLogin, validateRegister, handleValidationErrors } = require('../middleware/validators');

// Authentication routes
router.post('/register', validateRegister, handleValidationErrors, register);
router.post('/login', validateLogin, handleValidationErrors, login);
router.get('/me', authenticateToken, getCurrentUser);

module.exports = router;
