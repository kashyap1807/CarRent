const mongoose = require('mongoose');

function connectDB(){
    mongoose.connect('mongodb+srv://carpool1:carpoolpassword@carpool1.ejclsbd.mongodb.net/?retryWrites=true&w=majority',{useUnifiedTopology:true ,useNewUrlParser:true})

    const connection = mongoose.connection

    connection.on('connected',()=>{
        console.log('MongoDB connection successfully...');
    })


    connection.on('error',()=>{
        console.log('connection Error')
    })

}

connectDB();

module.exports = mongoose;

