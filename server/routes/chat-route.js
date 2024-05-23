const express = require('express')

const chatController = require('../controllers/chat-controller.js')
const tagController = require('../controllers/tag-controller.js')
const messageController = require('../controllers/message-controller.js')

const router = express.Router()   
  
router.get('/allChatComplete', chatController.chatAllComplete)
router.get('/allChatWithLastMessage', chatController.chatAllWithLastMessage)
router.get('/getLastChatId', chatController.getLastChatId)
router.post('/chatAllWithLastMessageByTags', chatController.chatAllWithLastMessageByTags)
router.post('/oneChatComplete', chatController.oneChatComplete) 

router.get('/getAllTags', tagController.getAllTags)
router.get('/getAllTagsByChat', tagController.getAllTagsByChat)
router.post('/getTagsByChat', tagController.getTagsByChat)

router.post('/chat', chatController.chatCreate)
router.post('/tag', tagController.tagCreate)
router.post('/tagChatLink', tagController.tagChatLinkCreate)
router.post('/message', messageController.messageCreate) 

router.post('/editChat', chatController.editChat)

router.put('/deleteChat', chatController.chatDelete)
router.put('/deleteTag', tagController.tagDelete)
router.put('/tagChatLinkDelete', tagController.tagChatLinkDelete)
router.put('/deleteMessage', messageController.messageDelete)

module.exports = router