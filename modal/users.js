const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    image: {
        type: String
    },
    gender: {
        type: String
    },
    cart: [
        {
            title:String,
            size: String,
            total: Number,
            sub:Number,
            quantity: Number,
            old_price: Number,
            new_price:Number,
            discount:String,
            image:String,
            id:String
        }
    ]
})

module.exports = mongoose.model('Users', userSchema)