const express = require("express");
const router = express.Router();
const Poop = require('../model/Poop');


router.get('/', function(req, res) {
    var searchName = req.query.item;
    console.log("thing " + searchName);
    Poop.findOne({ item: { $regex: `^${searchName}` } }, function(err, items) {
        if (err) {
            res.send(err);
        } else if (!items) {
            res.send({ message: `No items found matching '${searchName}'` });
            console.log("not found " + searchName);
        } else {
            res.json(items);
            console.log(items);
        }
    });
});


module.exports = router;