const router = require("express").Router();
const personController = require("../../controllers/person.controller.js");
const ROLES_LIST = require('../../config/rolesList.js')
const verifyRoles = require('../../middlewares/verifyRoles.js')


// verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
router.get('/getall/:id', verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), personController.getAllPersonal)
router.get('/get/:email', personController.getPersonal)
router.post('/create', verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), personController.createPersonal)
router.put('/update/:id', personController.updatePersonal)
router.delete('/delete/:id', verifyRoles(ROLES_LIST.Admin), personController.deletePersonal)

module.exports = router;
