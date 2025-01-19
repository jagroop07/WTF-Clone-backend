const mongoose = require("mongoose")

const connectDb = async() =>{
    try {
        await mongoose.connect(process.env.DBCONNECT)
        console.log("database connected successfully")
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = connectDb