var express = require('express')
var app = express()
var path = require('path')
var bodyParser = require('body-parser')
var router = require('./router.js')
var session = require('express-session')

app.use('/node_modules/',express.static(path.join(__dirname,'./node_modules/')))
app.use('/public/',express.static(path.join(__dirname,'./public/')))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.engine('html',require('express-art-template'));

app.use(session({
  secret: 'zodiac',
  resave: false,
  saveUninitialized: false 
}))

app.use(router)

app.use(function(req,res){
	res.render('404.html')
})

app.use(function(err,req,res,next){
	
	res.status(500).json({
		err_code : 500,
		message : 'opps...server down'
	})
})

app.listen(1818,function(){
	console.log('server is running')
})