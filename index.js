const express = require('express')
const dotenv = require('dotenv')
const connectDb = require('./db/db')
const cors = require('cors')
const Userrouter = require('./routes/user')
const productrouter = require('./routes/product')
dotenv.config()
const app = express()

//middleware
app.use(express.json())
app.use(cors())
app.use("/users", Userrouter)
app.use("/product",productrouter)
app.use(express.static('./upload'))

//database 
connectDb()

//server
const PORT = process.env.PORT
app.listen(PORT,()=>{
    console.log(`server is running at Port: ${PORT}`)
})