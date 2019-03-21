
var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/demo')

var Schema = mongoose.Schema

var studentSchema = new Schema({
	name : {
		type : String,
		required : true
	},
	gender : {
		type : Number,
		enum : [0, 1],
		default : 0
	},
	age : {
		type : Number,
		required : true
	},
	hobbies : {
		type : String
	}

})

module.exports = mongoose.model('Student111',studentSchema)