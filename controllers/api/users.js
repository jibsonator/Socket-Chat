var router = require('express').Router()
var User = require('../../models/user')
var jwt = require('jwt-simple')
var config = require('../../configure')

router.get('/', function (req, res, next) {
    if(!req.headers['x-auth']){
        return res.send(401)
    }
    var auth  = jwt.decode(req.headers['x-auth'], config.secret)
    User.findOne({username: auth.username}, function (err, user) {
        if (err) { return next(err) }
        res.json(user)
    })
})

router.post('/', function(req,res,next) {
    var user = new User({username: req.body.username})
})

module.exports = router
