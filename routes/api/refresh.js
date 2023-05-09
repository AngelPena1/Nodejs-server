const router = require("express").Router();
const {handleRefreshToken} = require('../../controllers/user/refreshToken.controller.js')

router.get('/', handleRefreshToken);

module.exports = router;
