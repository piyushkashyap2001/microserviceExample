const express = require('express');
const router = express.Router()
const bookRouter = require('./bookService')
const customerRouter = require('./customerService')
const orderRouter = require('./orderService')

router.use((req, res, next) => {
    console.log("Called:======> ", req.path)
    next()
})

router.use(bookRouter)
router.use(customerRouter)
router.use(orderRouter)

module.exports = router