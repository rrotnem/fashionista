const express = require('express')
const adminUser = require('../controller/AdminController')
const router = express.Router()

router.post('/login', adminUser.adminLogin)
router.post('/register', adminUser.adminRegister)


module.exports = router