const express = require("express");
const router = express.Router();
const userController = require('../controllers/loginController');

router.delete('/', userController.deleteUser);
router.post('/', userController.login);

module.exports = router;