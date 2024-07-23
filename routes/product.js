const express = require("express")
const { getproduct, getCategory } = require("../controller/product")
// const protect = require('../middleware/jwtmiddleware')
const router = express.Router()

router.get("/getall", getproduct)
router.post('/compare/:category/:sort', getCategory)

module.exports = router