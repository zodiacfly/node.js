
var express = require('express');
var bodyParser = require('body-parser');
var router = require('./router.js');
var app = express();

app.use('/public/',express.static('./public/'));
app.use('/node_modules/',express.static('./node_modules/'));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.engine('html',require('express-art-template'));

app.use(router)
app.use(function(req,res){
	res.render('404.html')
})

   .listen(1818,function(){
   	console.log('server is running')
   })