const express = require('express')
const list = require('../controller/WishListController')
const router = express.Router()

const { authMiddleware } = require('../controller/UserController')

router.post('/addList', list.StoreList)
router.get('/getLists/:id', list.GetALLList)
router.delete('/deleteList/:id', list.RemoveListById)


module.exports = router