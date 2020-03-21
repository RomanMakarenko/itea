const router = require('express').Router();
const controllers = require('../controllers');

router.route('/login')
    .post(controllers.LoginController.loginUser);

module.exports = router;