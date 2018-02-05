const router = require('express').Router();
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const config = require('../config');

router.post('/signup', (req, res, next) => {
    console.log(req.body);
    let user = new User();
    user.email = req.body.email;
    user.password = req.body.password;

    User.findOne({email: req.body.email}, (err, existingUser) => {
        if(existingUser){
            res.json({
                success: false,
                message: 'Account with that email already exists'
            });
        }
        else {
            user.save();
            var token = jwt.sign({
                user: user
            }, config.secret, {
                expiresIn: '7d'
            });
            res.json({
                success: true,
                message: '',
                token: token,
                email: req.body.email
            });
        }
    });
});


router.post('/login', (req, res) => {
    User.findOne({
        email: req.body.email
    }, function(err, existingUser) {
        if(err) {
            res.json({
                success: false,
                message: err
            });
        };

        if(!existingUser){
            res.json({
                success: false,
                message: 'User not found'
            });
        }
        else if (existingUser){
            var validPassword = existingUser.comparePassword(req.body.password);
            if(!validPassword){
                res.json({
                    success: false,
                    message: 'Authentication failed'
                });
            }
            else {
                const token = jwt.sign({
                    user: existingUser
                }, config.secret, {
                    expiresIn: '7d'
                });
    
                res.json({
                    success: true,
                    message: 'Enjoy token',
                    token,
                    email: req.body.email
                });
            }
        }        
    });
});

module.exports = router;