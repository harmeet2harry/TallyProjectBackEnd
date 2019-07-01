const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../_helpers/db');
const userModel = db.User;

module.exports = {
    createUser
};


async function createUser(userParam) {
    console.log(userParam);
    if (await userModel.findOne({email : userParam.email})) {
        throw 'User email already registered';
    }

    const user = new userModel(userParam);

    user.passwordHash = bcrypt.hashSync(userParam.passwordHash, 10);

    user.save();
}



