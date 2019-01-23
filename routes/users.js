const Router = require('express').Router()
const Authenticated = require('../middlewares/Authenticated')
const { register, login, index } = require('../controllers/userControllers')

Router.post('/register', register)
Router.post('/login', login)
Router.get('/users', Authenticated, index)

module.exports = Router
