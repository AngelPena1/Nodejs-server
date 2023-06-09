const router = require('express').Router()
const {HandleSign} = require('../../../controllers/sign_xml/sign.controller.js')

router.post('/sign', HandleSign)

module.exports = router