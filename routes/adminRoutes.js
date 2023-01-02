const express = require("express");
const router = express.Router();
const Poop = require('../model/Poop');

router.get('/', function(req, res) {
    // Query the database for all items
    Poop.find({}, function(err, items) {
        if (err) {
            res.send(err);
        } else {
            res.send(items);
        }
    });
});

//add item to db
router.post('/', (req, res) => {
    //get data from client and add it to mongodb
    var newPoop = Poop(req.body).save(function(err, data) {
        if (err) throw err;
        console.log(data.item + " <= was added to the database");
        res.status(200);
    });
});

//update selected item
router.put('/:id', (req, res) => {
    var updatedId = req.params.id;
    Poop.findById({ _id: updatedId }, function(err, _id) {
        if (err) {
            res.send(err);
        } else if (!_id) {
            res.send({ message: `${updatedId} not found` });
        } else {
            Poop.findByIdAndUpdate({ _id: updatedId }, req.body, function(err) {
                if (err) {
                    res.send(err);
                } else {
                    res.send({ message: `${updatedId} was updated in db` });
                    console.log(`${updatedId} was updated in db`);
                }
            });
        }
    });
})

//delete selected item
router.delete('/:id', (req, res) => {
    //delete selected item from mongodb
    var delId = req.params.id;
    Poop.findById({ _id: req.params.id }, function(err, _id) {
        if (err) {
            res.send(err);
        } else if (!_id) {
            res.send({ message: `Item with id ${delId} not found` });
        } else {
            Poop.findByIdAndDelete({ _id: req.params.id }, function(err) {
                if (err) {
                    res.send(err);
                } else {
                    res.send({ message: `${delId} was deleted from db` });
                    console.log(`${delId} was deleted from db`);
                }
            });
        }
    });
});

router.delete('/megaDelete/yes', (req, res) => {
    //delete all items from mongodb
    Poop.deleteMany({}, function(err) {
        if (err) {
            res.send(err);
        } else {
            res.send({ message: 'All documents deleted' });
            console.log("what have you done!");
        }
    });
});


module.exports = router;