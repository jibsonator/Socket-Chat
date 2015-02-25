var router = require('express').Router()
var User = require('../../models/user')
var jwt = require('jwt-simple')
var config = require('../../configure')

router.get('/', function (req, res, next) {
    if(!req.headers['x-auth']){
        return res.send(401)
    }
    // that attempts to retrieve the token from the header
    var token = req.headers['x-auth']
    // try to decode the JWT
    var auth  = jwt.decode(token, config.secret)

    User.findOne({username: auth.username}, function (err, user) {
        if (err) { return next(err) }
      	console.log(user)
        res.json(user)
    })
})

router.post('/', function(req,res,next) {
    var user = new User({username: req.body.username})
       
    user.save(function (err) {
        if (err) { return next(err)}
        res.send(201)
    })
})

module.exports = router
