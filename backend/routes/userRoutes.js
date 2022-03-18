const express = require('express');
const router = express.Router();

//pulled in from userControllers.js
const { registerUser, loginUser, getMe } = require('../controllers/userController');

router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/me', getMe)

module.exports = router;
