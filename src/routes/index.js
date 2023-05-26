const express = require('express')
const router = express.Router()
const Users =   require('./usersRoute')
const Ticket =   require('./ticketRoute')
const Booking =   require('./bookingRoute')

router.use('/users',Users)
router.use('/ticket',Ticket)
router.use('/booking',Booking)

router.get('/',function(req, res) {
    res.json({ message: 'Welcome to Ankasa API !!!' });   
})

module.exports = router