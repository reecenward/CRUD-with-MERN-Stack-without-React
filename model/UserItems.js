const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.API_KEY);

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    about: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    searches: {
        type: Number,
        required: false
    }
});

const userItemsSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    items: [itemSchema]
});

module.exports = mongoose.model('UserItems', userItemsSchema);