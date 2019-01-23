const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports.register = (req, res) => {
    const { name, username, email, password } = req.body

    // Check if password is provided
    if (!password) {
        res.status(400).json({ password: 'password required' })
    }
    // check if password is lesthen 6 char
    if (password.length <= 6) {
        res.status(400).json({
            password: 'Password should be atleast 6 character',
        })
    }

    const user = new User({
        name,
        username,
        email,
        password: bcrypt.hashSync(password, 10),
    })
    user.save()
        .then(user => {
            const { _id, name, email, username } = user
            res.json({
                message: 'User created successfully',
                user: {
                    _id,
                    name,
                    username,
                    email,
                },
            })
        })
        .catch(e => {
            let errors = {}
            Object.keys(e.errors).forEach(err => {
                errors[err] = e.errors[err].message
            })
            res.status(400).json(errors)
        })
}

module.exports.login = (req, res) => {
    const { email, password } = req.body

    User.findOne({ email }).then(user => {
        if (user) {
            if (bcrypt.compareSync(password, user.password)) {
                res.json({
                    message: 'Login Successfully!!',
                    token: jwt.sign(
                        { email: user.email, userId: user._id },
                        process.env.SECRET
                    ),
                })
            } else {
                res.status(401).json({
                    message: 'Wrong credentials',
                })
            }
        } else {
            res.status(404).json({
                message: `No user foun with email address: ${email}`,
            })
        }
    })
}

module.exports.index = (req, res) => {
    User.find({})
        .limit(parseInt(req.query.limit) || 1000)
        .then(users => res.json(users))
}
