const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({

    car: {
        type: mongoose.Schema.Types.ObjectId, ref: 'cars'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'users'
    },
    bookedTimeSlots:
    {
        from: { type: String },
        to: { type: String },
    },

    totalHours: {
        type: String
    },
    totalAmount: {
        type: String
    },
    transactionId: {
        type: String
    },

    driverRequired: {
        type: Boolean
    }

}, { timestamps: true })

const bookingModel = mongoose.model('bookings', bookingSchema);

module.exports = bookingModel;
