const knex = require('./../db')

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
