const express = require("express");
const router = express.Router();
const userController = require('../controllers/signupController');

router.delete('/', userController.deleteUserItems);
router.post('/', userController.signup);

module.exports = router;