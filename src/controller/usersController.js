const {selectUsers,insertUsers,selectUsersById,findUser,insertOTP,getOTP,updateUsers} = require('../model/usersModel')
const generateToken = require('./../helper/generateToken');
const email = require("../middleware/emailOTP")
const {v4:uuidv4} = require('uuid')
const argon2 = require('argon2');

const usersController = {
    createUsers: async (req,res,next) => {
        try {
            if (!req.body.email || !req.body.password || !req.body.name) {
                res.status(404).json({status:404,message:`Please fill all data`})
            } else {
                let {rows:[users]} = await findUser(req.body.email)
                if (users) {
                    res.status(401).json({status:401,message:`Email has been registered`})
                } else {
                    let id = uuidv4()

                    let data = {
                        id: id,
                        email: req.body.email,
                        password: await argon2.hash(req.body.password),
                        name: req.body.name,
                        photo: 'https://res.cloudinary.com/dogzrltg9/image/upload/v1684861256/recipes/dp_gq0vxx.png'
                    }

                    let register = await insertUsers(data)

                    if (!register) {
                        res.status(401).json({status:401,message:`Register failed`})
                    } else {
                        res.status(201).json({status:201,message:`Register success`})
                    }
                }
            }
        } catch (error) {
            res.status(404).json({status:404,message:`Register failed`})
        }
    },
    loginUsers: async (req,res,next)=>{
        try {
            if (!req.body.email || !req.body.password) {
                res.status(404).json({status:404,message:`Please fill Email or Password`})
            } else {
                let {rows:[users]} = await findUser(req.body.email)

                if (!users) {
                    res.status(404).json({status:404,message:`User not found`})
                } else {
                    let verifyPassword = await argon2.verify(users.password,req.body.password)

                    let data = users
                    delete data.password

                    let token = generateToken(users)

                    if (verifyPassword) {
                        users.token = token
                        delete users.password
                        res.status(200).json({status:200,message:`Login success`,data:users})
                    } else {
                        res.status(404).json({status:404,message:`Incorrect Password`})
                    }
                }
            }
        } catch (error) {
            next(error)
        }
    },
    getOTPforEmail: async (req,res,next)=>{
        try {
            if (!req.body.email) {
                res.status(404).json({status:404,message:`Please fill your email`})
            } else {
                let {rows:[users]} = await findUser(req.body.email)
                if (users) {
                    let otp = Math.floor(100000 + Math.random() * 900000)

                    let inOTP = await insertOTP(req.body.email,otp)
                    if (!inOTP) {
                        res.status(404).json({status:404,message:`Failed to get OTP`})
                    } else {
                        try {
                            let sendEmail =  email(req.body.email,otp)
                            if(sendEmail == 'email not send'){
                                res.status(404).json({status:404,message:`Failed to send email`})                
                            } else {
                                res.status(200).json({status:200,message:`Please check your email`})
                            }
                        } catch (error) {
                            res.status(404).json({status:404,error:error.message})
                        }
                    }
                } else {
                    res.status(404).json({status:404,message:`User not found`})
                }
            }
        } catch (error) {
            next(error)
        }
    },
    verifyChangePassword: async (req,res,next)=>{
        try {
            if (!req.body.email || !req.body.otp) {
                res.status(404).json({status:404,message:`Please fill your email and OTP`})
            } else {
                let findEmail = await getOTP(req.body.email,req.body.otp)
                if (!findEmail.rows[0]) {
                    res.status(404).json({status:404,message:`Your email or OTP wrong`})
                } else {
                    res.status(200).json({status:200,message:`Confirm success`,data:findEmail.rows})
                }
            }
        } catch (error) {
            next(error)
        }
    },
    updateUserData: async (req,res,next)=>{
        try {
            let show = await selectUsersById(req.payload.id)
            if (!show.rows[0]) {
                res.status(400).json({status:400,message:`User not found`})
            } else {
                
                let data = {
                    email: req.body.email || show.rows[0].email,
                    name: req.body.name || show.rows[0].name,
                    city: req.body.city || show.rows[0].city,
                    post_code: req.body.post_code || show.rows[0].post_code,
                    address: req.body.address || show.rows[0].address,
                    phone: req.body.phone || show.rows[0].phone,
                }

                let update = await updateUsers(req.payload.id,data)

                if (!update) {
                    res.status(400).json({status:400,message:`Update failed`})
                } else {
                    res.status(200).json({status:200,message:`Update Success`})
                }
            }
        } catch (error) {
            res.status(404).json({status:404,message:`Update Error ${error}`})
        }
    }
}

module.exports = usersController