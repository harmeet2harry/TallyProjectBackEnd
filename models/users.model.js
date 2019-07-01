const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let UsersSchema = new Schema({
    firstname: String,
    lastname: String,
    email: String,
    passwordHash: String
});

module.exports = mongoose.model('users', UsersSchema) ;