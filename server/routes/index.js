var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var config = require('../config/config');
var auth = jwt({
    secret: config.secretKey,
    userProperty: 'payload'
});

var authentication = require('../controllers/auth');
var users = require('../controllers/user');

router.post('/register', authentication.register);
router.post('/login', authentication.login);

router.get('/get_user/:id', users.getUser);
router.get('/get_users', users.getUsers);


module.exports = router;
