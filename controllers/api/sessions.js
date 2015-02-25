var router = require('express').Router()
var User = require('../../models/user')
var jwt = require('jwt-simple')
var config = require('../../configure')

router.post('/', function(req,res,next) {
    User.findOne({username:req.body.username})
        .select('username')
        .exec(function(err,user) {
            if (err) {return next(err)}
            if (!user) {return res.sendStatus(401)}

            var token = jwt.encode({username:user.username}, config.secret)
            res.send(token)
        })
})

module.exports = router