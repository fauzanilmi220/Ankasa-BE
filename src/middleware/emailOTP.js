const nodemailer = require("nodemailer")


let transporter = nodemailer.createTransport({
    host: "smtp.zoho.com",
    secure: true,
    port: 465,
    auth: {
      user: process.env.EMAIL_NAME,
      pass: process.env.EMAIL_PASSWORD
    },
  });
  
  module.exports = (emailClient,subject) => {
    let mailOption ={
        from:  process.env.EMAIL_NAME,
        to: emailClient,
        subject:`Your OTP is ${subject}`,
        text: `Hello, ${subject} is your OTP`
    }

    transporter.sendMail(mailOption,function(error,data){
        if(error){
            console.log("error : ", error)
            return "email not send"
        } else{
            console.log("email send")
            console.log(data)
            return "email success"
        }
    })
  }