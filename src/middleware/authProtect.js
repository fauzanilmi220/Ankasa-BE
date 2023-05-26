const jwt = require('jsonwebtoken')

let key = process.env.JWT_KEY

const protect = (req,res,next) => {
    try {
        let token
        if (req.headers.authorization) {
            let auth = req.headers.authorization
            console.log(auth)
            token = auth.split(" ")[1]
            console.log(token)
            let decode = jwt.verify(token,key)
            req.payload = decode
            console.log(decode)
            next()
        } else {
            res.status(404).json({status:404,message:`Login failed because need token`})
        }
    } catch (error) {
        console.log('Error :',error.message)
        if (error && error.name == 'JsonWebTokenError') {
            res.status(404).json({status:404,message:`Login failed because invalid token`})
        } else if (error && error.name == 'TokenExpiredError') {
            res.status(404).json({status:404,message:`Login failed because expired token`})
        } else {
            res.status(404).json({status:404,message:`Login failed because inactive token`})
        }
    }
}

module.exports = {protect}