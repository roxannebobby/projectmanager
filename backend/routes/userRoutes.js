const express = require('express');
const router = express.Router();

//pulled in from userControllers.js
const { registerUser, loginUser } = require('../controllers/userController');

router.post('/', registerUser);
router.post('/login', loginUser);

module.exports = router;
