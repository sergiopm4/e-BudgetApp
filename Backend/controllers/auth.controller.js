const User = require('../models/User.model');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const fs = require('fs');
const mongoose = require('mongoose');

let secrets = fs.readFileSync('./config/secrets.json');
secrets = JSON.parse(secrets);

mongoose.connect(secrets['mongo_login'], { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })

exports.register = (req, res) => {
    if (req.body['firstName'] && req.body['lastName'] && req.body['password'] && req.body['email'] && req.body['location']) {
        User.find((err, users) => {
            let userExist = false;
            if (err) throw err;
            for (i = 0; i < users.length; i++) {
                if (req.body['email'] === users[i]['email']) {
                    userExist = true;
                    res.send({ 'Error': 'EMAIL_ALREADY_USED' })
                }
            }
            if (userExist === false) {
                bcrypt.hash(req.body.password, 14, (err, hash) => {
                    if (err) throw err;
                    const newUser = new User({
                        "_id": mongoose.Types.ObjectId(),
                        "firstName": req.body.firstName,
                        "lastName": req.body.lastName,
                        "password": hash,
                        "email": req.body.email,
                        "location": req.body.location,
                        "registerDate": Date.now()
                    });
                    newUser.save((err, result) => {
                        if (err) throw err;
                        res.send({ "Message": "USER SAVED", "_id": result._id })
                    })
                })
            }
        })

    } else {
        res.send({ 'Error': 'BODY_INVALID' })
    }
}



exports.login = (req, res) => {
    if (req.body['email'] && req.body['password']) {

        User.find({ email: req.body['email'] }, (err, users) => {
            if (err) throw err;
            if (users.length === 0) {
                res.send({ 'Error': 'EMAIL_INVALID' });
                return;
            }
            bcrypt.compare(req.body['password'], users[0]['password'], (err, result) => {
                if (err) throw err;
                if (result) {
                    jwt.sign({ 'email': users['email'] }, secrets['jwt_clave'], (err, token) => {
                        if (err) throw err;
                        res.cookie('sello', token);
                        res.send({ 'Message': 'LOGIN_OK', 'token': token, 'id': users[0]['id'], 'firstName': users[0]['firstName'], 'lastName': users[0]['lastName'] })
                    })
                } else {

                    res.send({ 'Error': 'PASSWORD_INVALID' })
                }
            })
        })
    } else {
        res.send({ 'Error': 'BODY_INVALID' });
    }
}


//. Check TOKEN
exports.checkToken = (req, res, callback) => {
    if (req.cookies['sello'] !== undefined) {

        jwt.verify(req.cookies['sello'], secrets['jwt_clave'], (err, decoded) => {
            if (err) throw err;
            if (!decoded) {
                res.send({ 'Error': 'TOKEN_INVALID' })
                return false;
            } else {
                callback(req, res)
                return true;
            }
        })
    } else {
        res.send({ 'Error': 'Not authorized', 'login': '/login' });
    }
}