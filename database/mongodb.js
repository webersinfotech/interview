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
        const that = this;
        return new Promise((res, rej) => {
            mongoose.connect(`${host}:${port}/${database}`, {useNewUrlParser: true}, async (err, result) => {
                if(err) {
                    console.error('Failed to connect to mongo on startup - retrying in 1 sec', err);
                    setTimeout(await this._makeConnection(), 1000);
                }
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