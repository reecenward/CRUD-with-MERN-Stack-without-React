const express = require("express");
const router = express.Router();
const { requireAuth, checkUser } = require('../Middleware/authMiddleware');
const itemController = require('../controllers/itemController');

router.get('/', requireAuth, checkUser, itemController.getItems);
router.post('/', requireAuth, checkUser, itemController.addItem);
router.put('/:id', requireAuth, checkUser, itemController.updateItem);
router.delete('/:id', requireAuth, checkUser, itemController.deleteItem);

module.exports = router;