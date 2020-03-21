const router = require('express').Router();
const controllers = require('../controllers');

router.route('/order/create')
    .post(controllers.OrderController.createOrder);

router.route('/order/:id')
    .get(controllers.OrderController.getOrder)
    .put(controllers.OrderController.updateOrder)
    .delete(controllers.OrderController.removeOrder);

module.exports = router;
