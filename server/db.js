const path = require('path')

const dbPath = path.resolve(__dirname, 'db/database.sqlite')

const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: dbPath,
  },
  useNullAsDefault: true
})

knex.schema.hasTable('tag')
.then((exists) => {
  if (!exists) {
    return knex.schema.createTable('tag', (table)  => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('color').notNullable();
      table.integer('created_at').notNullable();
      table.integer('updated_at').notNullable();
    })
    .then(() => {
      console.log('Table \'Tag\' created')
    })
    .catch((error) => {
      console.error(`There was an error creating table \'Tag\': \n${error}`)
    })
  }
})
.then(() => {
  console.log('done')
})
.catch((error) => {
  console.error(`There was an error setting up the database: ${error}`)
})

knex.schema.hasTable('chat')
.then((exists) => {
  if (!exists) {
    return knex.schema.createTable('chat', (table)  => {
      table.increments('id').primary();
      table.string('color').notNullable();
      table.integer('created_at').notNullable();
      table.integer('updated_at').notNullable();
    })
    .then(() => {
      console.log('Table \'Chat\' created')
    })
    .catch((error) => {
      console.error(`There was an error creating table \'Chat\': \n${error}`)
    })
  }
})
.then(() => {
  console.log('done')
})
.catch((error) => {
  console.error(`There was an error setting up the database: ${error}`)
})


knex.schema.hasTable('message')
.then((exists) => {
  if (!exists) {
    return knex.schema.createTable('message', (table)  => {
      table.increments('id').primary();
      table.string('text').notNullable();
      table.integer('chatId').unsigned().notNullable();
      table.foreign('chatId').references('id').inTable('chat');
      table.integer('created_at').notNullable();
      table.integer('updated_at').notNullable();
    })
    .then(() => {
      console.log('Table \'message\' created')
    })
    .catch((error) => {
      console.error(`There was an error creating table \'message\': \n${error}`)
    })
  }
})
.then(() => {
  console.log('done')
})
.catch((error) => {
  console.error(`There was an error setting up the database: ${error}`)
})



knex.schema.hasTable('tag_chat')
.then((exists) => {
  if (!exists) {
    return knex.schema.createTable('tag_chat', function (table) {
      table.primary(['tagId', 'chatId']);
      table.integer('tagId');
      table.foreign('tagId').references('id').inTable('tag')
      table.integer('chatId');
      table.foreign('chatId').references('id').inTable('chat');
    })
    .then(() => {
      console.log('Table \'tag_chat\' created')
    })
    .catch((error) => {
      console.error(`There was an error creating table \'tag_chat\': \n${error}`)
    })
  }
})
.then(() => {
  console.log('done')
})
.catch((error) => {
  console.error(`There was an error setting up the database: ${error}`)
})

knex.select('*').from('chat')
  .then(data => console.log('data:', data))
  .catch(err => console.log(err))
  .limit(3)

module.exports = knex

