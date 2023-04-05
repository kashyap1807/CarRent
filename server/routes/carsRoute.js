const express = require('express');
const router = express.Router();
const Car = require('../models/carModel');

router.get('/getallcars', async (req, res) => {

    try {
        const cars = await Car.find()
        res.send(cars)
    }
    catch (error) {
        res.status(400).json(error);
    }
});

router.post('/addcar', async (req, res) => {

    try {
        const newcar = Car(req.body);
        await newcar.save();
        // res.send('new car added successfully');
        res.send(req.body);
    }
    catch (error) {
        res.status(400).json(error);
    }
});

router.post('/deletecar', async (req, res) => {

    try {
        await Car.findOneAndDelete({ _id: req.body.carid })
        res.send('car deleted successfully');

    }
    catch (error) {
        res.status(400).json(error);
    }
});

router.post('/editcar', async (req, res) => {

    try {
        const car = await Car.findOne({ _id: req.body._id })
        car.name = req.body.name;
        car.image = req.body.image;
        car.capacity = req.body.capacity;
        car.fuelType = req.body.fuelType;
        car.rentPerHour = req.body.rentPerHour;

        await car.save();

        // res.send('new car added successfully');
        // res.send(req.body);
        res.send('car details updated successfully');
    }
    catch (error) {
        res.status(400).json(error);
    }
});

module.exports = router;
