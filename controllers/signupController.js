const UserItems = require('../model/UserItems');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
    return jwt.sign({ id }, 'secret', { expiresIn: maxAge });
}

exports.deleteUserItems = (req, res) => {
    UserItems.deleteMany({}, function(err) {
        if (err) {
            res.send(err);
        } else {
            res.send({ message: 'All documents deleted' });
            console.log("what have you done!");
        }
    });
}

exports.signup = (req, res) => {
    const { username, password } = req.body;

    // Check if the username is already taken
    User.findOne({ username }, (err, user) => {
        if (err) {
            console.error(err);
            res.sendStatus(500);
        } else if (user) {
            // If the user already exists, send an error message
            res.send({ error: 'Username already exists' });
            return;
        } else {
            // If the username is available, create a new user and a new collection for their items
            bcrypt.hash(password, 10, (err, hashedPassword) => {
                if (err) {
                    console.error(err);
                    res.sendStatus(500);
                } else {
                    const newUser = new User({ username, password: hashedPassword });
                    newUser.save((err) => {
                        if (err) {
                            console.error(err);
                            res.sendStatus(500);
                        } else {
                            const token = createToken(newUser._id);
                            const newUserItems = new UserItems({ username, items: [] });
                            newUserItems.save((err) => {
                                if (err) {
                                    console.error(err);
                                    res.sendStatus(500);
                                } else {
                                    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
                                    res.send({ success: 'Account created successfully' });
                                }
                            });
                        }
                    });
                }
            });
        }
    });
};