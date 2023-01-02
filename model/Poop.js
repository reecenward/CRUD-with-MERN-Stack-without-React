const mongoose = require('mongoose');
const Schema = mongoose.Schema;

require('dotenv').config();
//connect to the database
mongoose.connect(process.env.API_KEY);

const poopSchema = new Schema({
    item: String
});

module.exports = mongoose.model('Poop', poopSchema);