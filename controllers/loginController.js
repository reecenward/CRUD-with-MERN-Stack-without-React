const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
    return jwt.sign({ id }, 'secret', { expiresIn: maxAge });
}

exports.deleteUser = (req, res) => {
    User.deleteMany({}, function(err) {
        if (err) {
            res.send(err);
        } else {
            res.send({ message: 'All documents deleted' });
            console.log("what have you done!");
        }
    });
}

exports.login = (req, res) => {
    const { username, password } = req.body;

    // Find the user with the specified username
    User.findOne({ username }, (err, user) => {
        if (err) {
            console.error(err);
            res.sendStatus(500);
        } else if (!user) {
            // If the user does not exist, send an error message
            res.send({ error: 'Invalid username or password' });
        } else {
            // Compare the provided password with the hashed password in the database
            bcrypt.compare(password, user.password, (err, result) => {
                if (err) {
                    console.error(err);
                    res.sendStatus(500);
                } else if (result) {
                    // If the passwords match, send a success message
                    const token = createToken(user._id);
                    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
                    res.send({ success: 'Logged in successfully ' });
                } else {
                    // If the passwords do not match, send an error message
                    res.send({ error: 'Invalid username or password' });
                }
            });
        }
    });
};