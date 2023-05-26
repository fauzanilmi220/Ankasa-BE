const express = require('express')
const router = express.Router()
const {createUsers,loginUsers,getOTPforEmail,verifyChangePassword,updateUserData} = require('../controller/usersController')
const {protect} = require('./../middleware/authProtect')

router.post('/register',createUsers)
router.post('/login',loginUsers)
router.post('/otp',getOTPforEmail)
router.post('/otp/confirm',verifyChangePassword)
router.put('/update',protect,updateUserData)

module.exports = router