const express = require('express')
const graphqlHTTP = require('express-graphql')
const cors = require('cors')
//  PostgreSQL client for Node.js.
const pg = require('pg') 
// create a new pool to the database
const pgPool = new pg.Pool({ database: 'mydb' })
const app = express()

if (process.env.NODE_ENV === 'development') {
    require('dotenv').config({ path: 'development.env' })
}

app.set('port', process.env.PORT || 7000)

const ncSchema = require('./schema')

//Set GraphQL as middleware
app.use('/graphql', cors(), (req, res) => {
    graphqlHTTP({
        schema: ncSchema,
        graphiql: process.env.NODE_ENV === 'development',
        context: { pgPool, req }
    })(req, res)
})

const server = app.listen(app.get('port'), () => {
    console.log(`Server running -> PORT ${server.address().port}`)
})

module.exports = app