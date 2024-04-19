const express = require('express')

const chatRoutes = require('../controllers/chat-controller.js')

const router = express.Router()

router.get('/allChatComplete', chatRoutes.chatAllComplete)
router.get('/allChatWithLastMessage', chatRoutes.chatAllWithLastMessage)
router.get('/getLastChatId', chatRoutes.getLastChatId)
router.post('/oneChatComplete', chatRoutes.oneChatComplete) 
router.post('/getTagsByChat', chatRoutes.getTagsByChat)
router.post('/getAllTags', chatRoutes.getAllTags)

router.post('/chat', chatRoutes.chatCreate)
router.post('/tag', chatRoutes.tagCreate)
router.post('/tagChatLink', chatRoutes.tagChatLinkCreate)
router.post('/message', chatRoutes.messageCreate) 

router.post('/editChat', chatRoutes.editChat)

router.put('/deleteChat', chatRoutes.chatDelete)
router.put('/deleteTag', chatRoutes.tagDelete)
router.put('/deleteMessage', chatRoutes.messageDelete)
router.put('/tagChatLinkDelete', chatRoutes.tagChatLinkDelete)

module.exports = router