const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.user);

router.get('/:id?', userController.userID);

module.exports = router;

