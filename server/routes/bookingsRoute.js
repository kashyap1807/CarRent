const express = require('express');
const Booking = require('../models/bookingModel');
const Car = require('../models/carModel');
const router = express.Router();
const stripe = require("stripe")('sk_test_51K7wa4SEPK45WRcGMvxgnXdq8b7aO3hXtT4H0QaJR8qqFNsYQ3dAVO8c9wSFtYIzowg0Dx5V80Y8ViPZvfsqTJbY00m7EUeYcO');
const { v4: uuidv4 } = require('uuid');

router.post('/bookcar', async (req, res) => {


    const { token } = req.body

    try {
        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id
        });

        const payment = await stripe.charges.create({
            amount: req.body.totalAmount * 100,
            currency: "inr",
            customer: customer.id,
            receipt_email: token.email
        },
            {
                idempotencyKey: uuidv4()
            })
        if (payment) {

            req.body.transactionId = payment.source.id;
            const newbooking = new Booking(req.body);
            await newbooking.save();
            const car = await Car.findOne({ _id: req.body.car })
            car.bookedTimeSlots.push(req.body.bookedTimeSlots);

            await car.save();
            res.send('Your booking is successfull');
        }
        else {
            return res.status(400).json(error);
        }

        // res.send(req.body);
    }
    catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
});

router.get('/getallbookings', async (req, res) => {

    try {
        const bookings = await Booking.find().populate('car')
        res.send(bookings)
    }
    catch (error) {
        res.status(400).json(error);
        console.log(error);
    }
});

module.exports = router;
