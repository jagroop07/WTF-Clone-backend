const jwt = require('jsonwebtoken')

const jwtmiddleware = async(req,res,next) => {
    try {
        const token = req.headers.token

        if(!token){
            return res.send("no token present")
        }
        else{
            const decode = jwt.verify(token,process.env.SECRET_KEY)
            req.user = decode
            next()
        }
    } catch (error) {
        return res.send(error.message)
    }
}

module.exports = jwtmiddleware