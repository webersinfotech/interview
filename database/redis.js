const ioredis = require("ioredis");
const {
    databases: {
        redis: {
            config: {
                host,
                port,
                namespace
            }
        }
    }
} = require('../config')
const redis = new ioredis({
    port: port, // Redis port
    host: host, // Redis host
    family: 4, // 4 (IPv4) or 6 (IPv6)
    db: namespace
});
const { uuid } = require('uuidv4');

class Redis {
    constructor () {}

    createRecord(index, obj) {
        obj.id = uuid()
        return redis.lpush(index, JSON.stringify(obj))
    }

    async listRecords(index, columns = []) {
        const returnRows = []
        const rows = await redis.lrange(index, 0, -1)
        rows.map((row) => returnRows.push(JSON.parse(row)))
        return returnRows
    }
}

// (async () => {
//     const conn = new Redis()
//     // const res = await conn.createRecord('users', {
//     //     name: 'Rushabh Shah'
//     // })
//     const res = await conn.listRecords('users')
//     console.log(res)
// })()

module.exports = new Redis()