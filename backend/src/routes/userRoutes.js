const express = require('express');
const router = express.Router();

const { registerUser, loginUser, userProfile, logoutUSer } = require('../controllers/userController');

router.post('/register', registerUser);

router.post('/login', loginUser);

router.post('/logout', logoutUSer);

router.get('/profile', userProfile);

module.exports = router;
