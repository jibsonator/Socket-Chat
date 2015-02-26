var express =require('express')
var router = express.Router()

router.use(express.static(__dirname + '/../static'))

router.use(express.static(__dirname + '/../angular'))

// define a handler for homepage
router.get('/',function(req,res){
	// define a handler for homepage
    res.sendfile('index.html')
})
module.exports =router
