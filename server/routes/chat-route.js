const express = require('express')

const chatRoutes = require('../controllers/chat-controller.js')

const router = express.Router()

router.get('/allChatComplete', chatRoutes.chatAllComplete)
router.get('/allChatWithLastMessage', chatRoutes.chatAllWithLastMessage)

router.post('/chat', chatRoutes.chatCreate)
router.post('/tag', chatRoutes.tagCreate)
router.post('/message', chatRoutes.messageCreate)

router.put('/deleteChat', chatRoutes.chatDelete)
router.put('/deleteTag', chatRoutes.tagDelete)
router.put('/deleteMessage', chatRoutes.messageDelete)

module.exports = router