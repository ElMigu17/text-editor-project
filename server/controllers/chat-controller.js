const knex = require('./../db')

exports.chatAllComplete = async (req, res) => {
  knex
    .select('chat.*', 'message.created_at as created_at', 'message.text', 'tag.color as tagColor', 'tag.name as tagName') 
    .from('chat')
    .leftJoin('message', 'chat.id', 'message.chatId')
    .leftJoin('tag_chat', 'tag_chat.chatId', 'chat.id')
    .leftJoin('tag', 'tag_chat.tagId', 'tag.id')
    .then(userData => {
      res.json(userData)
    })
    .catch(err => {
      res.json({ message: `There was an error retrieving chats: ${err}` })
    })
} 

exports.chatAllWithLastMessage = async (req, res) => {
  var subquery = knex
    .select('id')
    .from('message')
    .orderBy('created_at', 'desc')
    .limit(1);

  knex
    .select('chat.*', 'message.created_at as created_at', 'message.text', 'tag.color as tagColor', 'tag.name as tagName') 
    .from('chat')
    .leftJoin('message', 'chat.id', 'message.chatId')
    .leftJoin('tag_chat', 'tag_chat.chatId', 'chat.id')
    .leftJoin('tag', 'tag_chat.tagId', 'tag.id')
    .where('message.id', 'in', subquery)
    .then(userData => {
      res.json(userData)
    })
    .catch(err => {
      res.json({ message: `There was an error retrieving chat: ${err}` })
    })
}

exports.oneChatComplete = async (req, res) => {
  knex
    .select('chat.*', 'message.created_at as created_at', 'message.text', 'tag.color as tagColor', 'tag.name as tagName') 
    .from('chat')
    .leftJoin('message', 'chat.id', 'message.chatId')
    .leftJoin('tag_chat', 'tag_chat.chatId', 'chat.id')
    .leftJoin('tag', 'tag_chat.tagId', 'tag.id')
    .where("chat.id", req.body.chatId)
    .then(userData => {
      res.json(userData)
    })
    .catch(err => {
      res.json({ message: `There was an error retrieving chats: ${err}` })
    })
} 

exports.chatCreate = async (req, res) => {
  const timestamp = Date.now();
  knex('chat')
    .insert({
      'color': req.body.color,
      created_at: timestamp,
      updated_at: timestamp
    })
    .then(() => {
      res.json({ message: `Chat created.` })
    })
    .catch(err => {
      res.json({ message: `There was an error creating chat: ${err}` })
    })
}

exports.tagCreate = async (req, res) => {  
  const timestamp = Date.now();
  knex('tag')
    .insert({ 
      'name': req.body.name,
      'color': req.body.color, 
      created_at: timestamp,
      updated_at: timestamp
    })
    .then(() => {
      res.json({ message: `Chat by created.` })
    })
    .catch(err => {
      res.json({ message: `There was an error creating chat: ${err}` })
    })
}

exports.messageCreate = async (req, res) => { 
  const timestamp = Date.now();
  knex('message')
    .insert({
      'text': req.body.text,
      'chatId': req.body.chatId,
      created_at: timestamp,
      updated_at: timestamp
    })
    .then(() => {
      res.json({ message: `Message created.` })
    })
    .catch(err => {
      res.json({ message: `There was an error creating chat: ${err}` })
    })
}

exports.chatDelete = async (req, res) => {
  knex('chat')
    .where('id', req.body.id) 
    .del() 
    .then(() => {
      res.json({ message: `Chat ${req.body.id} deleted.` })
    })
    .catch(err => {
      res.json({ message: `There was an error deleting ${req.body.id} chat: ${err}` })
    })
}
exports.messageDelete = async (req, res) => {
  knex('message')
    .where('id', req.body.id) 
    .del() 
    .then(() => {
      res.json({ message: `Message ${req.body.id} deleted.` })
    })
    .catch(err => {
      res.json({ message: `There was an error deleting ${req.body.id} message: ${err}` })
    })
}
exports.tagDelete = async (req, res) => {
  knex('tag')
    .where('id', req.body.id) 
    .del() 
    .then(() => {
      res.json({ message: `Tag ${req.body.id} deleted.` })
    })
    .catch(err => {
      res.json({ message: `There was an error deleting ${req.body.id} tag: ${err}` })
    })
}


