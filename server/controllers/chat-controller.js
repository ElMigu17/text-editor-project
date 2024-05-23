const { group } = require('console')
const knex = require('./../db')

//#region getters
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
    .select('chat.*', 'message.updated_at as updated_at', 'message.created_at as created_at', 'message.text', 'tag.color as tagColor', 'tag.name as tagName') 
    .from('chat')
    .leftJoin('message', 'chat.id', 'message.chatId')
    .leftJoin('tag_chat', 'tag_chat.chatId', 'chat.id')
    .leftJoin('tag', 'tag_chat.tagId', 'tag.id')
    .where('message.created_at', 'in', subquery)
    .then(chatsData => {

      var dataReorganized = {}
      for(let i in chatsData){
        let chat = chatsData[i];
        let id = chat.id;
        if(!dataReorganized[id]){
          let novoChat = {}
          novoChat.color = chat.color;
          novoChat.text = chat.text;
          novoChat.colcreated_ator = chat.created_at;
          novoChat.updated_at = chat.updated_at;
          novoChat.id = chat.id;
          novoChat.tag = [];
          dataReorganized[id] = novoChat;
        }
        let novaTag = {};
        novaTag.tagColor = chat.tagColor;
        novaTag.tagName = chat.tagName;
        dataReorganized[id].tag.push(novaTag);
      }

      res.json(Object.values(dataReorganized))
    })
    .catch(err => {
      res.json({ message: `There was an error retrieving chat: ${err}` })
    })   
}

exports.chatAllWithLastMessageByTags = async (req, res) => { 
  console.log(req.body);
  let tagsId = Object.keys(req.body.tags).map((key) => req.body.tags[key]);
  var subquery = knex.max('created_at')
    .from('message')
    .groupBy('chatId');

  knex
    .select('chat.*', 'message.updated_at as updated_at', 'message.created_at as created_at', 'message.text', 'tag.color as tagColor', 'tag.name as tagName') 
    .from('chat')
    .leftJoin('message', 'chat.id', 'message.chatId')
    .leftJoin('tag_chat', 'tag_chat.chatId', 'chat.id')
    .leftJoin('tag', 'tag_chat.tagId', 'tag.id')
    .where('message.created_at', 'in', subquery)
    .whereIn('tag.id', tagsId)
    .then(chatsData => {

      var dataReorganized = {}
      for(let i in chatsData){
        let chat = chatsData[i];
        let id = chat.id;
        if(!dataReorganized[id]){
          let novoChat = {}
          novoChat.color = chat.color;
          novoChat.text = chat.text;
          novoChat.colcreated_ator = chat.created_at;
          novoChat.updated_at = chat.updated_at;
          novoChat.id = chat.id;
          novoChat.tag = [];
          dataReorganized[id] = novoChat;
        }
        let novaTag = {};
        novaTag.tagColor = chat.tagColor;
        novaTag.tagName = chat.tagName;
        dataReorganized[id].tag.push(novaTag);
      }

      res.json(Object.values(dataReorganized))
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

exports.editChat = async (req, res) => {
  const timestamp = Date.now();
  knex('chat')
    .where('id', req.body.id)
    .update({
      'color': req.body.color,
      updated_at: timestamp
    })
    .then(() => {
      res.json({ message: `Chat edited.` })
    })
    .catch(err => {
      res.json({ message: `There was an error editing chat: ${err}` })
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


