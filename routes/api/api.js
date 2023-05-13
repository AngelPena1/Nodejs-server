const router = require('express').Router()
// const personRoutes = require('./person.js')
const userRoutes = require('./dataView/user.js')

// const verifyJWT = require('../../middlewares/verifyJWT.js')

router.use('/user', userRoutes)
// router.use('/person', verifyJWT, personRoutes)

module.exports = router