var express = require('express')
var router = express.Router()
var user = require('./models/user.js')
var md5 = require('blueimp-md5')
var fs = require('fs')

router.get('/',function(req,res){
	res.render('index.html',{
		user : req.session.user
	})
})

router.get('/register',function(req,res){
	res.render('register.html')
})

router.post('/register',function(req,res,next){
	var body = req.body
	user.findOne({
		$or : [{
			email : body.email
		},
		{
			username : body.username
		}]
	},function(err,data){
		if(err){
			return next(err)
		}
		if(data){
			return res.status(200).json({
				err_code : 1,
				message : 'email or username has existed',
				email : body.email,
				username : body.username
			})
		}
		body.password = md5(md5(body.password))

		new user(body).save(function(err,data,next){
			if(err){
				return next(err)
			}
			req.session.user = data

			res.status(200).json({
				err_code : 0,
				message : 'ok'
			})
		})
	})
})

router.get('/login',function(req,res){
	res.render('login.html')
})

router.post('/login',function(req,res,next){
	var body = req.body
	// fs.readFile('./ewe.js',function(err,data){
	// 	if(err){
	// 		return next(err)
	// 	}
	// })
	user.findOne({
		email : body.email,
		password : md5(md5(body.password))
	},function(err,data){
		if(err){
			return next(err)
		}
		if(!data){
			return res.status(200).json({
				err_code : 1,
				message : 'invaild username or password',
				email : body.email
			})
		}
		req.session.user = data

		res.status(200).json({
			err_code : 0,
			message : 'ok'
		})
	})
})

router.get('/logout',function(req,res,next){
	delete req.session.user

	res.redirect('/login')
})
module.exports = router
