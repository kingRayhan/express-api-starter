const jwt = require('jsonwebtoken')

const Authentication = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decode = jwt.verify(token, process.env.SECRET)
        req.user = decode
        next()
    } catch (error) {
        res.status(401).json({
            message: 'UnAuthorized',
        })
    }
}

module.exports = Authentication
