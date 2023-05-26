const Pool = require('../config/db')

const selectBooking = () => {
    return Pool.query(
      `SELECT * FROM booking`
    );
};

const selectBookingByUser = (id) => {
    return Pool.query(
        `
        SELECT 
            b.ticket_id, 
            b.id as booking_id, 
            t.plane_id,
            t.takeoff, 
            t.landing, 
            t.transit, 
            t.price, 
            t.duration, 
            p.name as plane_name, 
            t.class, 
            t.terminal, 
            t.gate,
            ao.name as origin_name, 
            ao.city as origin_city, 
            ao.country as origin_country, 
            ao.airport_code as origin_code,
            ad.name as destination_name, 
            ad.city as destination_city, 
            ad.country as destination_country, 
            ad.airport_code as destination_code,
            b.is_paid, 
            b.insurance, 
            b.insurance_price, 
            b.total, 
            b.subtotal, 
            b.total_passenger
        FROM 
            booking as b
        JOIN
            ticket as t ON t.id = b.ticket_id
        JOIN
            plane as p ON p.id = t.plane_id
        JOIN
            airport as ao ON ao.id = t.origin
        JOIN
            airport as ad ON ad.id = t.destination
        WHERE 
            b.user_id = '${id}'
        `
    );
};

const selectBookingById = (id) => {
    return Pool.query(
        `
        SELECT 
            b.ticket_id, 
            b.id as booking_id, 
            t.plane_id,
            t.takeoff, 
            t.landing, 
            t.transit, 
            t.price, 
            t.duration, 
            p.name as plane_name, 
            t.class, 
            t.terminal, 
            t.gate,
            ao.name as origin_name, 
            ao.city as origin_city, 
            ao.country as origin_country, 
            ao.airport_code as origin_code,
            ad.name as destination_name, 
            ad.city as destination_city, 
            ad.country as destination_country, 
            ad.airport_code as destination_code,
            b.is_paid, 
            b.insurance, 
            b.insurance_price, 
            b.total, 
            b.subtotal, 
            b.total_passenger
        FROM 
            booking as b
        JOIN
            ticket as t ON t.id = b.ticket_id
        JOIN
            plane as p ON p.id = t.plane_id
        JOIN
            airport as ao ON ao.id = t.origin
        JOIN
            airport as ad ON ad.id = t.destination
        WHERE 
            b.id = '${id}'
        `
    );
};

const insertBooking = data => {
    const {id,user_id,ticket_id,is_paid,insurance,insurance_price,total,subtotal,total_passenger} = data
    return new Promise((resolve,reject)=>
    Pool.query(`INSERT INTO booking(id,user_id,ticket_id,is_paid,insurance,insurance_price,total,subtotal,total_passenger) VALUES('${id}','${user_id}','${ticket_id}',${is_paid},${insurance},${insurance_price},${total},${subtotal},'${total_passenger}');`,(err,result)=>{
        if(!err){
        resolve(result)
        } else {
        reject(err)
        }
    }))
};

const paymentUpdate = (id,paid) => {
    return Pool.query(
        `UPDATE booking SET is_paid = ${paid} WHERE id = '${id}'`
    );
};


module.exports = {selectBooking, selectBookingByUser, selectBookingById, insertBooking, paymentUpdate}