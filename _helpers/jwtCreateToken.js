const jwt = require('jsonwebtoken');

function getJWTToken(user) {
    return new Promise((resolve, reject) => {
        jwt.sign({user}, 'SecretKey', { expiresIn: 4000}, (err, token) => {
            if (err) {
                return reject(err);
            }
            return resolve(token);
        });
    });
   
}

module.exports = {
    getJWTToken
}