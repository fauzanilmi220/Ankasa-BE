const {selectBooking,selectBookingByUser,selectBookingById,insertBooking,paymentUpdate} = require('../model/bookingModel')
const {v4:uuidv4} = require('uuid')

const bookingController = {
    createBooking: async (req,res,next) => {
        try {
                let data = {
                    id: uuidv4(),
                    user_id: req.payload.id,
                    ticket_id: req.body.ticket_id,
                    is_paid: req.body.is_paid,
                    insurance: req.body.insurance,
                    insurance_price: req.body.insurance_price,
                    total: req.body.total,
                    subtotal: req.body.subtotal,
                    total_passenger: req.body.total_passenger
                }
                
                create = await insertBooking(data)

                if (!create) {
                    res.status(401).json({status:401,message:`Create Booking failed`})
                } else {
                    res.status(201).json({status:201,message:`Create Booking success`})
                }
        } catch (error) {
            res.status(404).json({status:404,message:`Create Booking failed`})
        }
    },
    getMyBooking: async (req,res,next) => {
        try {
            let showTicket = await selectBookingByUser(req.payload.id)
            if (!showTicket.rows[0]) {
                res.status(400).json({status:400,message:`Booking not found`})
            } else {
                res.status(200).json({status:200,message:`Booking found`,data:showTicket.rows})
            }
        } catch (error) {
            res.status(404).json({status:404,message:`Booking failed`})
        }
    },
    getBookingId: async (req,res,next) => {
        try {
            let showTicket = await selectBookingById(req.params.id)
            if (!showTicket.rows[0]) {
                res.status(400).json({status:400,message:`Booking not found`})
            } else {
                res.status(200).json({status:200,message:`Booking found`,data:showTicket.rows})
            }
        } catch (error) {
            res.status(404).json({status:404,message:`Booking failed`})
        }
    },
    updatePayment: async (req,res,next) => {
        try {
            if (!req.body.is_paid || !req.body.id) {
                res.status(404).json({status:404,message:`Please fill paid status and id booking`})
            } else {
                let update = await paymentUpdate(req.body.id,req.body.is_paid)

                if (!update) {
                    res.status(401).json({status:401,message:`Update failed`})
                } else {
                    res.status(201).json({status:201,message:`Update success`})
                }
            }
        } catch (error) {
            res.status(404).json({status:404,message:`Update failed`})
        }
    }
}

module.exports = bookingController