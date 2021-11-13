const mongoose = require('mongoose');
const users = require('./schema/user')
const {
    databases: {
        mongodb: {
            config: {
                host,
                port,
                database
            }
        }
    }
} = require('../config')
const { uuid } = require('uuidv4');

const collections = {
    users
}

class MongoDB {
    constructor () {
        const that = this;

        (async () => {
            try{
                await that._makeConnection();
            }
            catch(Error){
                console.log(Error)
            }
        })();
    }

    async _makeConnection() {
        return new Promise((res, rej) => {
            mongoose.connect(`${host}:${port}/${database}`, {useNewUrlParser: true}, (err, result) => {
                if(err) rej(err);
                res(result);
            })
        })
    }

    createRecord(collection, document) {
        document.id = uuid()
        return collections[collection].create(document)
    }

    listRecords(collection, columns = []) {
        const selects = {}
        if (columns.length) columns.map((column) => selects[column] = 1)
        return collections[collection].find({}, selects || null)
    }
}

// (async () => {
//     const conn = new MongoDB()
//     const res = await conn.listRecords('users', [])
//     console.log(res)
// })()

module.exports = new MongoDB()