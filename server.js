//SETUP

var express=require('express')

var app=express()
// express initializes app to be a function handler 
var http = require('http').Server(app);
// app is supplied to http server
var io = require('socket.io')(http);
// initializes a new instance by passing in http object
var morgan = require('morgan')
//log requests to the console
var bodyParser = require('body-parser')
//pull information from the html POST
var jwt = require('jwt-simple')
//
var config = require('./configure')
//

app.use(morgan('dev'))
//log every request to the console
app.use(bodyParser.json())
//parse application/json


app.use(function (req, res, next) {
	//need to decode JWT sessions for logged in users
    if (req.headers['x-auth']) {
        req.auth = jwt.decode(req.header('x-auth'), config.secret)
    }
    next() //call the next middleware function
})
//ROUTES

//delivering static content (index.html and js files...)
app.use('/',require('./controllers/static'))

//posting new messages and displaying messages
app.use('/api/messages',require('./controllers/api/messages'))

//for registering new users
app.use('/api/users',require('./controllers/api/users'))

//for logging in as an existing user
app.use('/api/sessions',require('./controllers/api/sessions'))


//SOCKETS

//listen for connection event for incoming sockets
io.on('connection',function(socket){
	socket.on('chat message', function(msg){
     // emit the event from the server to the rest of the users
     io.emit('chat message', msg);
  });
})

var port=process.env.PORT || 8080


http.listen(port,function(){
	console.log('Magic happens on port '+port)
})