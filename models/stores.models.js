const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let StoresSchema = new Schema({
    StoreId: Number,
    Location: String,
});

module.exports = mongoose.model('stores', StoresSchema) ;