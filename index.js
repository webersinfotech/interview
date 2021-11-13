require('dotenv').config({ debug: process.env.DEBUG })
const express = require('express')
const status = require('http-status')
const {
    port
} = require('./config')
const path = require('path')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, ''));

const user = require('./controller/user')

// Usually we are not writing routes like this instead we are doing app.use router and creating respective directory for each module under the route directory

app.get('/user', async (req, res) => {
    try {
        console.log('Received request ::: GET ::: user') // Usually in production such kind of log we are storing in datadog and this log very helpful to debug app in production
        const users = await user.getUsers()
        res.status(status.OK).send({
            success: 1,
            data: users,
            message: 'Users fetched'
        })
    } catch (err) {
        console.log(err) // Usually in production such kind of log we are storing in datadog and this log very helpful to debug app in production
        res.status(status.INTERNAL_SERVER_ERROR).send({
            success: 0,
            message: 'Internal Sever Error'
        })
    }
})

app.post('/user', async (req, res) => {
    try {
        console.log('Received request ::: POST ::: user') // Usually in production such kind of log we are storing in datadog and this log very helpful to debug app in production
        await user.createUsers(req.body);
        res.status(status.OK).send({
            success: 1,
            message: 'User created successfully'
        })
    } catch (err) {
        console.log(err) // Usually in production such kind of log we are storing in datadog and this log very helpful to debug app in production
        res.status(status.INTERNAL_SERVER_ERROR).send({
            success: 0,
            message: 'Internal Sever Error'
        })
    }
})

// Serving static HTML
app.get('/', (req, res) => res.render('./views/index'))

app.listen(port, () => {
    console.log(`Service is listening on port ${port}`)
})