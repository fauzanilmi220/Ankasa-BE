const {selectTicket,selectTicketById,insertTicket} = require('../model/ticketModel')
const {v4:uuidv4} = require('uuid')

const ticketController = {
    createTicket: async (req,res,next) => {
        try {
            if (!req.body.plane_id || !req.body.origin || !req.body.destination || !req.body.takeoff || !req.body.landing || !req.body.transit || !req.body.price || !req.body.duration) {
                res.status(404).json({status:404,message:`Please fill all data`})
            } else {
                let data = {
                    id: uuidv4(),
                    plane_id: req.body.plane_id,
                    origin: req.body.origin,
                    destination: req.body.destination,
                    takeoff: req.body.takeoff,
                    landing: req.body.landing,
                    transit: req.body.transit,
                    price: req.body.price,
                    duration: req.body.duration
                }
                
                create = await insertTicket(data)

                if (!create) {
                    res.status(401).json({status:401,message:`Create Ticket failed`})
                } else {
                    res.status(201).json({status:201,message:`Create Ticket success`})
                }
            }
        } catch (error) {
            res.status(404).json({status:404,message:`Create Ticket failed`})
        }
    },
    getAllTicket: async (req,res,next) => {
        try {
            let showTicket = await selectTicket()
            if (!showTicket.rows[0]) {
                res.status(400).json({status:400,message:`Ticket not found`})
            } else {
                res.status(200).json({status:200,message:`Ticket found`,data:showTicket.rows})
            }
        } catch (error) {
            res.status(404).json({status:404,message:`Ticket failed`})
        }
    },
    getTicketById: async (req,res,next) => {
        try {
            let showTicket = await selectTicketById(req.params.id)
            if (!showTicket.rows[0]) {
                res.status(400).json({status:400,message:`Ticket not found`})
            } else {
                res.status(200).json({status:200,message:`Ticket found`,data:showTicket.rows})
            }
        } catch (error) {
            res.status(404).json({status:404,message:`Ticket failed`})
        }
    },
}

module.exports = ticketController