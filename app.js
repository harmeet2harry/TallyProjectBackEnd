const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwtAuth = require('./_helpers/jwt');
const cors = require('cors');
const router = express.Router();

const errHandler = require('./_helpers/error-handler');


// db.on('error', console.log('error'))

const app = express();
router.options('/', cors());
app.use(express.urlencoded());
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

app.use(jwtAuth());

app.use('/api/users', require('./routes/users'));

app.use('/api/login', require('./routes/login'));


app.use(errHandler);
const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log('Server is listening' + port)
});