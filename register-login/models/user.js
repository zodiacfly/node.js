
var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/test', { useMongoClient:true })

var Schema = mongoose.Schema

var userSchema = new Schema({
  email : {
    type : String,
    required : true
  },
  username : {
    type : String,
    required : true
  },
  password : {
    type : String,
    required : true
  },
  avatar: {
    type: String,
    default: '/public/img/avatar-default.png'
  },

})

module.exports = mongoose.model('User',userSchema)

