const Pool = require('../config/db')

const selectUsers = () => {
    return Pool.query(
      `SELECT email,name,phone,city,address,post_code,photo FROM users`
    );
};

const findUser = (email) => {
    return new Promise((resolve,reject)=>
      Pool.query(`SELECT * FROM users WHERE email='${email}'`,
      (err,result)=>{
        if(!err){
          resolve(result)
        } else {
          reject(err)
        }
      }))
}

const selectUsersById = (email) => {
  return new Promise((resolve,reject)=>
    Pool.query(`SELECT * FROM users WHERE id='${email}'`,
    (err,result)=>{
      if(!err){
        resolve(result)
      } else {
        reject(err)
      }
    }))
}

const insertUsers = data => {
    const {id,email,password,name,photo} = data
    let query = ''
    query = `INSERT INTO users(id,email,password,name,photo) VALUES('${id}','${email}','${password}','${name}','${photo}')`
    return new Promise((resolve,reject)=>
    Pool.query(query,(err,result)=>{
        if(!err){
        resolve(result)
        } else {
        reject(err)
        }
    }))
};

const updateUsers = (id,data) => {
  const {email,name,phone,city,address,post_code} = data
  return new Promise((resolve,reject)=>
    Pool.query(`UPDATE users SET email = '${email}', name = '${name}', phone = '${phone}', city = '${city}', address = '${address}', post_code = '${post_code}' WHERE id = '${id}'`,
    (err,result)=>{
      if(!err){
        resolve(result)
      } else {
        reject(err)
      }
    }))
}

const insertOTP = (email,otp) => {
  return new Promise((resolve,reject)=>
    Pool.query(`UPDATE users SET otp = '${otp}' WHERE email = '${email}'`,
    (err,result)=>{
      if(!err){
        resolve(result)
      } else {
        reject(err)
      }
    }))
}

const getOTP = (email,otp) => {
  return new Promise((resolve,reject)=>
    Pool.query(`SELECT * FROM users WHERE email = '${email}' AND otp = '${otp}'`,
    (err,result)=>{
      if(!err){
        resolve(result)
      } else {
        reject(err)
      }
    }))
}


module.exports = {selectUsers, selectUsersById, findUser, insertUsers, insertOTP, getOTP, updateUsers}