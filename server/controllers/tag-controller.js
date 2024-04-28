const { group } = require('console')
const knex = require('./../db')

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
      messagetLastTagId().then((resTag) => {

        knex('tag_chat')
          .insert({
            chatId: req.body.chatId,
            tagId: resTag[0].id
          })
          .then(() => {

            res.json({ message: `Tag_Chat conection created.` })
          })
          .catch(err => {
            res.json({ message: `There was an error creating Tag_Chat: ${err}` })
          })
      });

    })
    .catch(err => {
      res.json({ message: `There was an error creating tag: ${err}` })
    })
}

messagetLastTagId = async (req, res) => {
  return knex
    .select('id')
    .from('tag')
    .max('id')
    .then(userData => {
      return userData;
    })
    .catch(err => {
      res.json({ message: `There was an error retrieving tagid: ${err}` })
    })
}
exports.getAllTags = async (req, res) => {
  knex
    .select('*')
    .from('tag')
    .then(userData => {
      res.json(userData)
    })
    .catch(err => {
      res.json({ message: `There was an error retrieving chats: ${err}` })
    })
}

exports.getAllTagsByChat = async (req, res) => {
  knex
    .select('*')
    .from('tag')
    .leftJoin('tag_chat', 'tag_chat.tagId', 'tag.id')
    .then(userData => {
      res.json(userData)
    })
    .catch(err => {
      res.json({ message: `There was an error retrieving chats: ${err}` })
    })
}

exports.getTagsByChat = async (req, res) => {
  knex
    .select('chat.*', 'tag.color as color', 'tag.name', "tag.id as id")
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
  knex
    .select('id')
    .from('tag')
    .max('id')
    .then(userData => {
      res.json(userData)
    })
    .catch(err => {
      res.json({ message: `There was an error retrieving tag: ${err}` })
    })
}

exports.tagChatLinkCreate = async (req, res) => {
  knex('tag_chat')
    .insert({
      'tagId': req.body.tagId,
      'chatId': req.body.chatId
    })
    .then(() => {
      res.json({ message: `tag_chat created.` })
    })
    .catch(err => {
      res.json({ message: `There was an error creating chat: ${err}` })
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

exports.tagChatLinkDelete = async (req, res) => { 
  knex('tag_chat')
    .where({
      'tagId': req.body.tagId,
      'chatId': req.body.chatId
    })
    .del()
    .then(() => {
      res.json({ message: `happened tagChatLinkDelete.` })
    })
    .catch(err => {
      res.json({ message: `There was an error deleting tagChatLinkD: ${err}` })
    })
}
