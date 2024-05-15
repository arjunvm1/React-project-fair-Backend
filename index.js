//loads .env file contents into process.env by  default


require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require('./Router/router')
require('./DB/connection')

//create express server

const pfServer = express()

pfServer.use(cors())
//parse incoming requests as JSON
pfServer.use(express.json())
pfServer.use(router)
pfServer.use('/uploads', express.static('./uploads'))


const PORT = 4000 || process.env.PORT

pfServer.listen(PORT, () => {
    console.log(`Project Fair at PORT:${PORT} and waiting for client request!!!`);
})


pfServer.get('/',(req,res)=>{
    res.send("<h1>Project fair server is running!!!  </h1>")
})

