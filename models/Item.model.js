const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let ItemSchema = new Schema({
    ItemCode: Number,
    ItemDescription: String,
});

module.exports = mongoose.model('items', ItemSchema) ;