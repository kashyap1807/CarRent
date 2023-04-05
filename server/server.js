const express = require('express');
const app = express();
const dbconnections = require('./db');
const carsRoute = require('./routes/carsRoute');
const userRoute = require('./routes/usersRoute');
const bookingsRoute = require('./routes/bookingsRoute');
app.use(express.json());

app.use('/api/cars', carsRoute);
app.use('/api/users', userRoute);
app.use('/api/bookings', bookingsRoute);

const path = require('path')

if (process.env.NODE_ENV === 'production') {

    app.use('/', express.static('client/build'))

    app.get('*', (req, res) => {

        res.sendFile(path.resolve(__dirname, 'client/build/index.html'));

    })

}


const port = process.env.PORT || 5000;

app.get('/', (req, res) => res.send("hello world"))
app.listen(port, () => console.log(`Server started in port ${port}`));
