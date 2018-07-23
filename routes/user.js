const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const User = require('../models/userModel');

router.post('/register', (req, res) => {
    const { login, password } = req.body;

    if (login === undefined || password === undefined) {
        return res.status(400).json('No login or password')
    }

    User.findOne({ login })
        .then(user => {
            if (user) {
                return res.status(400).json('User already exist');
            } else {
                const newUser = new User({
                    login: login,
                    password: password
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err));
                    });
                });
            }
        }
    );
});


router.post('/login', (req, res) => {
    const { login, password } = req.body;

    User.findOne({ login })
        .then(user => {
            if (!user) {
                return res.status(400).json('User not found');
            }

            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        const payload = { id: user.id, login: user.login }

                        jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600}, (err, token) => {
                            res.json({
                                success: true,
                                token: 'Bearer ' + token
                            });
                        });
                    } else {
                        return res.status(400).json('Password incorrect')
                    }
                });
        });
});

module.exports = router;