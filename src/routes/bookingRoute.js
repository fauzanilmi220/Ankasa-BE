const express = require('express')
const router = express.Router()
const {createBooking,getMyBooking,getBookingId,updatePayment} = require('../controller/bookingController')
const {protect} = require('./../middleware/authProtect')

router.get('/myBooking',protect,getMyBooking)
router.get('/detail/:id',protect,getBookingId)
router.post('/create',protect,createBooking)
router.put('/paidUpdate',updatePayment)

module.exports = router