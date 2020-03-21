const router = require('express').Router();
const controllers = require('../controllers');

router.route('/user/create')
    .post(controllers.UserController.createUser);

module.exports = router;
