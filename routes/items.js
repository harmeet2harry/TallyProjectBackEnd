const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const db = require('../_helpers/db');
const itemModal = db.Items;

router.get('/', (req, res) => {
    itemModal.find({}).then((items) => {
        console.log(items);
        res.status(201).json(items);
    }
    );
});

router.post('/', cors(), (req, res, next) => {
    console.log(req.body);
    const item = new itemModal({
        ItemCode: req.body.ItemCode,
        ItemDescription: req.body.ItemDescription
    });

    item.save().then(
        resp => {
            res.status(201).json(resp);
        }
    );
});


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
