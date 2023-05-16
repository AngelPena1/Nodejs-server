const router = require('express').Router()
// const personRoutes = require('./person.js')
// const userRoutes = require('./dataView/user.js')
const dataView = require('./dataView/api.js')

// const verifyJWT = require('../../middlewares/verifyJWT.js')

router.use('/dataview', dataView)
// router.use('/person', verifyJWT, personRoutes)

module.exports = router