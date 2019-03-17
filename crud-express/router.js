
var express = require('express');
var router = express.Router();
var fs = require('fs');
var student = require('./student.js');

router.get('/',function(req,res){
	student.findAll(function(err,data){
		if(err){
			return res.status(500).render('404.html')
		}
		res.render('index.html',{
			students : data
		})
	})
})

router.get('/students/new',function(req,res){
	res.render('new.html')
})

router.post('/students/new',function(req,res){
	student.save(req.body,function(err){
		if(err){
			return res.status(500).render('404.html')
		}
		res.redirect('/')
	})
})

router.get('/students/edit',function(req,res){
	student.findId(req.query.id,function(err,data){
		if(err){
			return res.status(500).render('404.html')
		}
		res.render('edit.html',{
			students : data
		})
	})
})

router.get('/students/delete',function(req,res){
	student.delete(req.query,function(err){
		if(err){
			return res.status(500).render('404.html')
		}
		res.redirect('/')
	})
})

router.post('/students/edit',function(req,res){
	
	student.edit(req.body,function(err){
		if(err){
			return res.status(500).render('404.html')
		}
		res.redirect('/')
	})
})
module.exports = router;