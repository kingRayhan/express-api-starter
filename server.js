const app = require('./app')

const mongoose = require('mongoose')
require('colors')

mongoose.connect(
    process.env.DBPATH,
    { useNewUrlParser: true }
)

mongoose.connection.on('connected', () => {
    console.log(`Connected to mongodb → ${process.env.DBPATH}`.cyan)
})
mongoose.connection.on('disconnected', () => {
    console.log(
        `Application disconnected from mongodb → ${process.env.DBPATH}`.bgRed
    )
})
mongoose.connection.on('error', () => {
    console.log(
        `Something wrong, couldn't connect to mongodb → ${process.env.DBPATH}`
            .bgRed
    )
})

/**
 * ----------------------------------------
 *  ## Start Server
 * ----------------------------------------
 */
const PORT = process.env.PORT || 2525
app.listen(PORT, () => {
    console.log(`Server working at port ${PORT}`)
})
