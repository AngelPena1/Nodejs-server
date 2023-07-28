const router = require('express').Router()
const userRoutes = require('./user.js')
const businessRoutes = require('./business.js')

router.use('/user', userRoutes)
router.use('/business', businessRoutes)

module.exports = router