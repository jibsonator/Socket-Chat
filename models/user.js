var db = require('../db')

var user = db.Schema({
    username: {type:String,required:true}
})

module.exports = db.model('User',user)


