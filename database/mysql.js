const {
    databases: {
        mysql: {
            config: {
                host,
                user,
                password,
                database
            }
        }
    }
} = require('../config')

const knex = require('knex')({
    client: 'mysql',
    connection: { host, user, database, password } // It is a simple connection in production we are using pool
})
const { uuid } = require('uuidv4');

class MySQL {
    constructor () {}

    createRecord(table, row) {
        row.id = uuid() // In every table we are creating unique ID so here we are setting the ID key here
        return knex(table).insert(row)
    }

    listRecords(table, columns = []) {
        return knex.select(...columns).from(table)
    }
}

// (async () => {
//     const conn = new MySQL()
//     const res = await conn.listRecords('users', ['*'])
//     console.log(res)
// })()

module.exports = new MySQL()