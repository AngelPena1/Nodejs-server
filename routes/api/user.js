const router = require("express").Router();
const {createUser, handleLogin, checkValidPwd, getAllUsers, getUserInfo, updateUser} = require("../../controllers/user/user.controller.js");
const {handleLogout} = require('../../controllers/user/logout.controller.js')
const {handleRefreshToken} = require('../../controllers/user/refreshToken.controller.js')
const verifyJWT = require('../../middlewares/verifyJWT.js')


router.get('/getall', getAllUsers)
router.get('/personal-info/:id', getUserInfo)
router.get('/logout', handleLogout)
router.get('/refresh', handleRefreshToken)
router.post('/auth', handleLogin)
router.post('/register', createUser)
router.post('/validpwd', checkValidPwd)
router.put('/update/:id', updateUser)


module.exports = router;
