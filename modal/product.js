const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    title:String,
    description:String,
    details:{
        material:String,
        fit:String,
        sleeve_length:String,
        necline:String,
        care_instruction:String
    },
    old_price:Number,
    new_price:Number,
    discount:String,
    image:String,
    category:String,
    avaliable_sizes:[String]
})

module.exports = mongoose.model('product', productSchema)