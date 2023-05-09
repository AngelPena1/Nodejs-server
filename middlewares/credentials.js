const whiteList = require('../config/whiteList')

const credentials = (req, res, next) => {
    const origin = req.headers.origin
    if(whiteList.indexOf(origin) !== -1 || !origin) {
        res.header('Access-Control-Allow-Credentials', true)
    }
    next()
}

module.exports = credentials