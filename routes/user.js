const express = require("express")
const { getuser, createuser, userLogin, loggeduser, patchUser, cartttt, profileEdit, changepass } = require("../controller/users")
const protect = require('../middleware/jwtmiddleware')
const router = express.Router()
const multer = require("multer")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'upload/image')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + file.originalname
      cb(null, uniqueSuffix)
    }
  })
  
const upload = multer({ storage: storage })

router.get('/all', getuser)
router.post('/signup',upload.single('avatar'),createuser)
router.post('/login',userLogin)
router.get('/logged', protect, loggeduser)
router.patch('/update/:id',upload.single('avatar'), profileEdit)
// router.patch('/:id',upload.single('avatar'),patchUser)
router.patch('/cart', cartttt)
router.patch('/password/:id',changepass)

module.exports = router