const config = require('../config')
const db = require(`../${config.databases[config.currentDB].path}`)

class User {
    constructor () {}

    async getUsers() {
        try {
            return await db.listRecords('users', [])
        } catch (err) {
            console.log(err)
            throw new Error('Internal Sever Error')
        }
    }

    async createUsers(data) {
        try {
            return await db.createRecord('users', data)
        } catch (err) {
            console.log(err)
            throw new Error('Internal Sever Error')
        }
    }
}

module.exports = new User()