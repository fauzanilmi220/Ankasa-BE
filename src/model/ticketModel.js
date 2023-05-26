const Pool = require('../config/db')

const selectTicket = () => {
    return Pool.query(
        `
        SELECT
            t.id as ticket_id, 
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
            ad.airport_code as destination_code
        FROM 
            ticket as t
        JOIN
            plane as p ON p.id = t.plane_id
        JOIN
            airport as ao ON ao.id = t.origin
        JOIN
            airport as ad ON ad.id = t.destination
        `
    );
};

const selectTicketById = (id) => {
    return Pool.query(
        `
        SELECT
            t.id as ticket_id, 
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
            ad.airport_code as destination_code
        FROM 
            ticket as t
        JOIN
            plane as p ON p.id = t.plane_id
        JOIN
            airport as ao ON ao.id = t.origin
        JOIN
            airport as ad ON ad.id = t.destination
        WHERE
            t.id = '${id}'
        `
    );
};

const insertTicket = data => {
    const {id,plane_id,origin,destination,takeoff,landing,transit,price,duration} = data
    return new Promise((resolve,reject)=>
    Pool.query(`INSERT INTO ticket(id,plane_id,origin,destination,takeoff,landing,transit,price,duration) VALUES('${id}',${plane_id},${origin},${destination},TO_TIMESTAMP('${takeoff}', 'DD-MM-YYYY HH24:MI'),TO_TIMESTAMP('${landing}', 'DD-MM-YYYY HH24:MI'),${transit},${price},'${duration}');`,(err,result)=>{
        if(!err){
        resolve(result)
        } else {
        reject(err)
        }
    }))
};

module.exports = {selectTicket, selectTicketById, insertTicket}