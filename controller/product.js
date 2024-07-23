const product = require("../modal/product")

const getproduct = async(req,res) => {
    try {
        const Product = await product.find({})
        return res.send(Product)
    } catch (error) {
        return res.send(error.message)
    }
}

const getCategory = async(req,res) => {
    try {
        let {category, sort} = req.params
        let data;

        if(category==="null"&&sort==="null"){
            data = await product.find({})
        }
        else if(category!=="null"&&sort==="null"){
            data = await product.find({category: category})
        }
        else if(category==="null"&&sort!=="null"){
            data = await product.find({}).sort({new_price: Number(sort)})
        }
        else{
            data = await product.find({category: category}).sort({new_price: Number(sort)})
        }

        return res.json({data})
    } catch (error) {
        return res.send(error.message)
    }
}

module.exports = {
    getproduct,
    getCategory
}