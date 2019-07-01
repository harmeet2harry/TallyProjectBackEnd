const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const userModel = require('../models/users.model');
const userController = require('../controllers/users.controller');

router.get('/', (req, res) => {
    res.status(201).json({"heelo": "world"})
});

router.post('/', cors(), verifytoken, (req, res, next) => {
  
    jwt.verify(req.token, 'SecretKey', {
    }, (err, authdata) => {
        if(err) {
            next(err);
        }
        else {
            // const userModel = mongoose.model('User', userSchema );
            const user = new userModel({
                firstname : req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email
            });
        
            user.save().then(
                resp => {
                    res.status(201).json(resp);
                }
            )
        }
    });
});

function verifytoken(req, res, next) {
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ')[1];
        req.token = bearer;
        next();
    }
    else {
        res.sendStatus(403);
    }
}

router.post('/register', (req, res) => {
    const userParam = req.body.data;
    console.log(userParam);
    userController.createUser(userParam).then((resp) => {
        res.status(200).json({'message': 'user created successfully'});
    }).catch(
        err => next(err)
    );
});



module.exports = router;
