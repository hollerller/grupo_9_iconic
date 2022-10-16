const ordersController = require('../controllers/ordersController');
const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/checkout/',authMiddleware,ordersController.showCart)
router.post('/checkout/:id', authMiddleware, ordersController.processCart);


router.get('/:id/delete', authMiddleware,ordersController.deleteProduct);

//router.get('/checkout/:id', ordersController.processCart);

module.exports = router;