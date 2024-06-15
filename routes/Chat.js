const express = require('express')
const router = express.Router()
const chatController = require('../controllers/Chat')

// router.post('/', chatController.createChat)
// router.get('/getall', chatController.getAllChats);
// router.delete('/:id', chatController.deleteChatById);
// router.post('/:id/messages', chatController.message)
router.post('/getname', chatController.getName)
module.exports = router
