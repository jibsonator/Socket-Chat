var jwt = require('jwt-simple')
var config = require('./configure')

// we want to deal with the clear text username of authenticated users on server side. The way we use it in the server.js file will make sure that this piece of code is executed for each request. If we find a token then we decode it and hand it around in req.auth

module.exports = function (req, res, next) {
    if (req.headers['x-auth']) {
        req.auth = jwt.decode(req.headers['x-auth'], config.secret)
    }
    next()
}