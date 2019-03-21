
var express = require('express');
var router = express.Router();
var student = require('./student.js');

router.get('/',function(req,res){
	student.find(function(err,data){
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
	new student(req.body).save(function(err){
		if(err){
			return res.status(500).render('404.html')
		}
		res.redirect('/')
	})
})

router.get('/students/edit',function(req,res){
	student.findById(req.query.id.replace(/"/g,''),function(err,data){
		if(err){
			return res.status(500).render('404.html')
		}
		res.render('edit.html',{
			students : data
		})
	})
})

router.get('/students/delete',function(req,res){
	student.findByIdAndRemove(req.query.id.replace(/"/g,''),function(err){
		if(err){
			return res.status(500).render('404.html')
		}
		res.redirect('/')
	})
})

router.post('/students/edit',function(req,res){
	
	student.findByIdAndUpdate(req.body.id.replace(/"/g,''),req.body,function(err){
		if(err){
			return res.status(500).render('404.html')
		}
		res.redirect('/')
	})
})
module.exports = router;