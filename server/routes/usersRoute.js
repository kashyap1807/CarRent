const { error } = require('console');
const express = require('express');
const router = express.Router();
const User = require('../models/userModel')

router.post('/login', async (req, res) => {

    const { username, password } = req.body

    try {
        const user = await User.findOne({ username, password })
        if (user) {
            res.send(user)
        }
        else {
            return res.status(400).json('user is not registered');
        }
    }
    catch (err) {
        return res.status(400).json(err);
    }

});

router.post('/register', async (req, res) => {


    try {
        const newuser = User(req.body)
        await newuser.save();
        res.send('User Register successFfully')
    }
    catch (err) {
        return res.status(400).json(err);
    }

});

module.exports = router;
