var express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const jwtAuth = require('../_helpers/jwtCreateToken');
const db = require('../_helpers/db');
const cors = require('cors');
const userModel = db.User;

router.post('/', cors(), (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    if (email && password) {
        // usermodel.find().then((resp, err) => {
        //     console.log(resp);
        // });
        userModel.findOne({
            email
        }).then((user) => {
            console.log(user)
            if (user && bcrypt.compareSync(password, user.passwordHash)) {
                const userInfo = {
                    email: user.email
                };
                jwtAuth.getJWTToken(userInfo).then(
                    (token, err) => {
                        if (err) {
                            console.log(err);
                        }
                        res.status(201).json({
                            'token': token
                        });
                    }
                )

                // jwt.sign({username: user.firstname}, 'SecretKey', { expiresIn: 1}, (err, token) => {
                //     if(err) {
                //         res.status(403);
                //     }
                //     res.status(201).json({'token': token});
                // });
            } else {
                res.status(500).json({
                    message: 'Username or password is incorrect'
                });
            }

        }).catch(function (err) {
            res.status(500).json({
                message: 'Username or password is incorrect'
            });
        })
    } else {
        res.status(500).json({
            message: 'Username or password is incorrect'
        });
    }


});

module.exports = router;