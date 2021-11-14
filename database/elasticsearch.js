const request = require('request');
const {
    databases: {
        elasticsearch: {
            config: {
                host,
                auth
            }
        }
    }
} = require('../config')
const { uuid } = require('uuidv4');

class Elasticsearch {
    constructor () {}

    createRecord(index, document) {
        document.id = uuid() // In every table we are creating unique ID so here we are setting the ID key here
        return this._makeRequest('_doc', 'POST', index, document)
    }

    async listRecords(index, columns = []) {
        const obj = {}
        if (columns.length) obj._source = columns
        const rows = JSON.parse(await this._makeRequest('_search', 'POST', index, obj))
        return rows?.hits?.hits?.map((row) => row._source)
    }

    // This is private member of object so starting with underscore
    _makeRequest(operation, method, index, document = '') {
        return new Promise((res, rej) => {
            console.log(`${host}/${index}/${operation}`)
            const options = {
                'method': method,
                'url': `${host}/${index}/${operation}`,
                'headers': {
                  'Authorization': auth,
                  'Content-Type': 'application/json'
                }
            };
            if (document) options.body = JSON.stringify(document)
            request(options, function (error, response) {
                if (error) rej(error);
                res(response.body);
            });
        })
    }
}

// (async () => {
//     const conn = new Elasticsearch()
//     const res = await conn.listRecords('users', '')
//     console.log('List Records ::: ', res)
// })()

module.exports = new Elasticsearch()