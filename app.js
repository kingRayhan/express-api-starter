const express = require('express')
const app = express()
require('dotenv').config()

require('./server') // db connection
app.use(require('cors')()) // Enable cors

/**
 * ----------------------------------------
 *  ## Body Parser
 * ----------------------------------------
 */
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

/**
 * ----------------------------------------
 *  ## Api Routes
 * ----------------------------------------
 */
app.use('/api/auth', require('./routes/users'))

// When no route match
app.use((req, res, next) => {
    res.status(404).json({
        message: 'No Resource found',
    })
})

module.exports = app
