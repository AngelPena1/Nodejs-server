const router = require('express').Router()
const personRoutes = require('./person.js')
const userRoutes = require('./user.js')

const verifyJWT = require('../../middlewares/verifyJWT.js')

router.use('/user', userRoutes)
// router.use(verifyJWT)
router.use('/person', verifyJWT, personRoutes)

module.exports = router