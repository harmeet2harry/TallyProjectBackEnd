const jwt = require('express-jwt');
const config = require('../config.json');
module.exports = jwtAuth;

function jwtAuth() {
    const secret = config.secretKey;
    return jwt({secret: 'SecretKey'}).unless({
        path: [
            '/api/login',
            '/api/users/register'
        ]
    });
}