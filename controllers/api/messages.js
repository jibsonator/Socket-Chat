var router = require('express').Router()
var Message = require('../../models/message')

router.get('/', function (req, res, next) {
    // get all the messages sort them by date and send them back as json
    Message.find()
        .sort('-date')
        .exec(function (err, messages) {
            if (err) { return next(err) }
            res.json(posts)
        })
})

router.post('/', function (req, res, next) {
    //create a messege, information comes as an AJAX request from Angularjs

    console.log(req)
    var message = new Message({
        username: req.auth.username,
        body:     req.body.body
    })
    message.save(function (err, post)
    {if (err) { return next(err) }
        res.status(201).json(post)
    })
})

module.exports = router
