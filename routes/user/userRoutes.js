const express = require('express')
const userController = require('./../../controller/user/userController')

const router = express.Router();
router.post('/register',userController.registerUser)
module.exports = router;



