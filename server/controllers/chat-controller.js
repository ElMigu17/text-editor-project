const { group } = require('console')
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

exports.getAllTags = async (req, res) => {
  knex
    .select('*') 
    .from('tag')
    .then(userData => {
      console.log(userData)
      res.json(userData)
    })
    .catch(err => {
      console.log(err)
      res.json({ message: `There was an error retrieving chats: ${err}` })
    })
} 

exports.getLastChatId = async (req, res) => {
  knex
    .select('id') 
    .from('chat')
    .max('id')
    .then(userData => {
      res.json(userData)
    })
    .catch(err => {
      res.json({ message: `There was an error retrieving chats: ${err}` })
    })
} 

exports.chatAllWithLastMessage = async (req, res) => {
  var subquery = knex.max('created_at')
    .from('message')
    .groupBy('chatId');

  knex
    .select('chat.*', 'message.created_at as created_at', 'message.text', 'tag.color as tagColor', 'tag.name as tagName') 
    .from('chat')
    .leftJoin('message', 'chat.id', 'message.chatId')
    .leftJoin('tag_chat', 'tag_chat.chatId', 'chat.id')
    .leftJoin('tag', 'tag_chat.tagId', 'tag.id')
    .where('message.created_at', 'in', subquery)
    .then(userData => {
      res.json(userData)
    })
    .catch(err => {
      res.json({ message: `There was an error retrieving chat: ${err}` })
    })
}

exports.oneChatComplete = async (req, res) => {
  knex
    .select('chat.*', 'message.created_at as created_at', 'message.text') 
    .from('chat')
    .leftJoin('message', 'message.chatId', 'chat.id')
    .where("chat.id", req.body.chatId)
    .then(userData => {
      res.json(userData)
    })
    .catch(err => {
      res.json({ message: `There was an error retrieving chats: ${err}` })
    })
} 

exports.getTagsByChat = async (req, res) => {
  knex
    .select('chat.*', 'tag.color as tagColor', 'tag.name as tagName') 
    .from('chat')
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

exports.getLastTagId = async (req, res) => {
  console.log("userData");
  knex
    .select('id') 
    .from('tag')
    .max('id')
    .then(userData => {
      console.log("userData", userData)
      res.json(userData)
    })
    .catch(err => {
      res.json({ message: `There was an error retrieving tag: ${err}` })
    })
} 

messagetLastTagId = async (req, res) => {
  console.log("userData");
  return knex
    .select('id') 
    .from('tag')
    .max('id')
    .then(userData => {
      console.log("userData", userData)
      return userData;
    })
    .catch(err => {
      res.json({ message: `There was an error retrieving tagid: ${err}` })
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
      messagetLastTagId().then( (resTag) => {

        console.log("resTag", resTag[0].id);
 
        knex('tag_chat')  
        .insert({ 
          chatId: req.body.chatId,
          tagId: resTag[0].id
        })
        .then(() => {
          console.log({ message: `Tag_Chat conection created.` })
  
          res.json({ message: `Tag_Chat conection created.` })
        })
        .catch(err => {
          console.log({ message: `There was an error creating Tag_Chat: ${err}` })
          res.json({ message: `There was an error creating Tag_Chat: ${err}` })
        })
      });
      
    })
    .catch(err => {
      console.log({ message: `There was an error creating tag: ${err}` })
      res.json({ message: `There was an error creating tag: ${err}` })
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


