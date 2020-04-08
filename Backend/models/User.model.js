const mongoose = require('mongoose');

const types = mongoose.Schema.Types;

const userSchema = new mongoose.Schema({
    "_id": {
        require: true,
        type: types.ObjectId
    },
    "firstName": {
        require: true,
        type: types.String
    },
    "lastName": {
        require: true,
        type: types.String
    },
    "password": {
        require: true,
        type: types.String
    },
    "email": {
        require: true,
        type: types.String
    },
    "location": {
        require: true,
        type: types.String
    },
    "registerDate": {
        require: true,
        type: types.Date
    }
})

module.exports = mongoose.model('User', userSchema);