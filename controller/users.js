const User = require('../modal/users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//tokengenerater function
const generateToken = (id) =>{
    const token = jwt.sign({id}, process.env.SECRET_KEY,{
        expiresIn: "1 day"
    })
    return token 
}

//getuser
const getuser = async(req,res) => {
    try {
        const user = await User.find({})
        return res.send(user)
    } catch (error) {
        return res.send(error.message)
    }
}

//patchuser
const patchUser = async(req,res) => {
    try {
        let {username,password,email,gender} = req.body
        let {id} = req.params
        const user = await User.updateOne({_id:id},{
            $set: {username:username, password:password, email:email, gender:gender, image: `http://localhost:8080/image/${req.file.filename}`}
        })
        return res.send(user)
    } catch (error) {
        return res.send(error.message)
    }
}

//signup
const createuser = async(req,res) => {
    try {
        let {username, email, gender, password} = req.body

        if(!username||!email||!gender||!password){
            return res.send("enter all the required fields")
        }

        let user = await User.findOne({username: username})

        if(user){
            return res.send("user already exists")
        }
        
        const salt = await bcrypt.genSalt(10)
        const hashpass = await bcrypt.hash(password,salt)

        await User.create({
            username,
            email,
            gender,
            password: hashpass,
            image: `http://localhost:8080/image/${req.file.filename}`
        })

        return res.json({message: "Success"})
    } catch (error) {
        return res.send(error.message)
    }
}

//finduserwhologgedin
const loggeduser = async(req,res) => {
    try{
        let {user} = req
        const loginn = await User.find({_id: user.id})
        const cart = await loginn[0].cart
        return res.json({loginn,cart})
    } catch(error){
        return res.send(error.message)
    }
}

//loginuser

const userLogin = async(req,res) => {
    try {
        let {username, password} = req.body 
        
        if(!username||!password){
            return res.json({message: "enter all the required fields"})
        }

        const isemail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        const testmail = isemail.test(username)
        let user
        if(testmail){
            user = await User.findOne({email: username})
        }
        else{
            user = await User.findOne({username: username})
        }

        if(user){ 
            if(await bcrypt.compare(password, user.password)){
                const token = generateToken(user._id)
                return res.json({message: "login successfully ", token, user})
            }
            else{
                return res.json({message: "wrong password"})
            }
        }
        else{
            return res.json({message: "user not found"})
        }
        
    } catch (error) {
        return res.json({message: error.message})
    }
}

//add cart to the database
const cartttt = async(req,res) => {
    try {
        let {dataa, user} = req.body

        if(!dataa||!user){
            return res.send("data and user must be non empty")
        }

        const username = user[0].username

        if(!username){
            return res.send('username must be non empty')
        }

        await User.updateOne({username: username},{
            $set: {cart: dataa}
        })
        return res.send("success")
    } catch (error) {
        return res.send(error.message)
    }
}

const profileEdit = async(req,res) => {
    try {
        let formdata = req.body
        let {id} = req.params

        let filteredUpdates = Object.fromEntries(                         //fromEntries converts back an array into the object
            Object.entries(formdata).filter(([ _, value]) => value !== null && value !== undefined && value!=='')  //entries convert the object into key,value  {key:value, key:value} --> [[key,value],[key,value]]
        );

        if(req.file){
            filteredUpdates.image = `http://localhost:8080/image/${req.file.filename}`
            console.log(req.file.filename)
        }

        await User.findByIdAndUpdate(id,{
            $set: filteredUpdates
        }, {new: true})

        return res.json({message: 'successfully updated'})
    } catch (error) {
        return res.json({message: error.message})
    }
}

//changepassword
const changepass = async(req,res) => {
    try {
        let {oldpass, newpass} = req.body
        let {id} = req.params

        const user = await User.findOne({_id:id})

        if(user&&!(await bcrypt.compare(oldpass , user.password))){
            return res.send("wrong password")
        }

        const salt = await bcrypt.genSalt(10)
        const hashpass = await bcrypt.hash(newpass, salt)

        await User.updateOne({_id: id},{
            $set: {password: hashpass}
        })

        return res.send("success")        
    } catch (error) {
        return res.send(error.message)
    }
}

module.exports = {
    getuser,
    createuser,
    userLogin,
    loggeduser,
    patchUser,
    cartttt,
    profileEdit,
    changepass
}