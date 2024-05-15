// Importing mongoose library to connect to MongoDB
const mongoose = require('mongoose')

// Getting the connection string from the environment variable
const connectionstring = process.env.DATABASE

// Connecting to MongoDB Atlas using the connection string
mongoose.connect(connectionstring).then(()=>{
    console.log("mongoDB Atlas successfully connected with pfserver");
}).catch((err)=>{
    console.log("Error in connecting to the database: "+ err);
})