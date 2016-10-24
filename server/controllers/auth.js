var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var jwt = require('jsonwebtoken');
var config = require('../config/config');
var validate = require('../utilities/validate');

var sendJSONresponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.register = function (req, res) {
    if (!req.body.username || !req.body.email || !req.body.password) {
        sendJSONresponse(res, 400, {
            "message": "All fields required"
        });
    } else {
        User.findOne({'email': req.body.email}, function (err, userInfo) {
            if (userInfo) {
                res.status(500);
                res.json({'message': 'Email already registered'});
            } else {
                User.findOne({'username': req.body.username}, function (err, userInfo) {
                    if (userInfo) {
                        res.status(500);
                        res.json({'message': 'Username already registered'});
                    } else {
                        var passed = validate.validate([
                            {
                                value: req.body.username,
                                checks: {
                                    required: true,
                                    minlength: 3,
                                    maxlength: 18,
                                    regex: /^[a-zA-Z0-9_]*$/
                                }
                            },
                            {
                                value: req.body.fullname,
                                checks: {
                                    required: true,
                                    minlength: 3,
                                    maxlength: 30,
                                    regex: /^[a-zA-Z0-9_\s]*$/
                                }
                            },
                            {
                                value: req.body.email,
                                checks: {
                                    required: true,
                                    minlength: 3,
                                    maxlength: 100,
                                    regex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                                }
                            },
                            {
                                value: req.body.password,
                                checks: {
                                    required: true,
                                    matches: req.body.confirm,
                                    minlength: 8,
                                    maxlength: 40
                                }
                            }
                        ]);

                        if (passed) {
                            var user = new User();
                            user.username = req.body.username;
                            user.fullname = req.body.fullname;
                            user.email = req.body.email;
                            user.rank = 1;
                            user.avatar = '';
                            user.setPassword(req.body.password);

                            user.save(function (err) {
                                var token;
                                token = user.generateJwt();
                                res.status(200);
                                res.json({
                                    token: token
                                });
                            });
                        } else {
                            sendJSONresponse(res, 401, {
                                message: "Invalid input. Please don't mess with Angular's form validation."
                            })
                        }
                    }
                });
            }
        });
    }
};

module.exports.login = function (req, res) {
    if (!req.body.email || !req.body.password) {
        sendJSONresponse(res, 400, {
            "message": "All fields required"
        });
    } else {
        passport.authenticate('local', function (err, user, info) {
            var token;
            if (err) {
                sendJSONresponse(res, 404, {
                    'message': 'Error!'
                });
            } else if (user) {
                token = user.generateJwt();
                sendJSONresponse(res, 200, {
                    token: token
                });
            } else {
                res.status(401).json(info);
            }
        })(req, res);
    }
};
