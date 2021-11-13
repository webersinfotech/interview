require('dotenv').config({ path: '../.env' })

const databases = {
    elasticsearch: {
        path: 'database/elasticsearch',
        config: {
            host: process.env.elasticHost,
            auth: process.env.elasticAuthorization
        }
    },
    mongodb: {
        path: 'database/mongodb',
        config: {
            host: process.env.mongodbHost,
            port: process.env.mongodbPort,
            database: process.env.mongodbDatabase
        }
    },
    mysql: {
        path: 'database/mysql',
        config: {
            host: process.env.mysqlHost,
            user: process.env.mysqlUsername,
            password: process.env.mysqlPassword,
            database: process.env.mysqlDatabase
        }
    },
    redis: {
        path: 'database/redis',
        config: {
            host: process.env.redisHost,
            port: process.env.redisPort,
            database: process.env.redisDatabase
        }
    }
}

const currentDB = 'mongodb' // Possible input elasticsearch, mongodb, mysql, redis

const port = 3000

module.exports = {
    databases,
    currentDB,
    port
}