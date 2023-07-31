const router = require('express').Router()
// const personRoutes = require('./person.js')
const xml = require('./sign_xml/sign')
const dataView = require('./dataView/api.js')
const pixel = require('./pixel/api.js')

// const verifyJWT = require('../../middlewares/verifyJWT.js')

router.use('/dataview', dataView)
router.use('/pixel', pixel)
router.use('/xml', xml)
// router.use('/person', verifyJWT, personRoutes)

module.exports = router