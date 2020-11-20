const express = require('express')
const adminUser = require('../controller/AdminController')
const router = express.Router()

router.post('/login', adminUser.adminLogin)
router.post('/register', adminUser.adminRegister)
router.get('/getAuthentication', adminUser.authMiddleware, function (req, res) {
    res.json({ 'access': true })
  })
  router.get('/allUsers', adminUser.GetAllUsers)
router.delete('/deleteUserById/:id', adminUser.DeleteUserById)
router.put('/updateUser', adminUser.UpdateUser)


module.exports = router