const express = require('express')
const user = require('../controller/UserController')
const router = express.Router()

const { authMiddleware } = require('../controller/UserController')

router.post('/register', user.register)

router.post('/login', user.login)


router.get('/profile', authMiddleware, function (req, res) {
  res.json({ 'access': true })
})

router.get('/client/users', user.GetAllUsers)
router.delete('/client/deleteUserById/:id', user.DeleteUserById)
router.put('/client/updateUser', user.UpdateUser)

module.exports = router