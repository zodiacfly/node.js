
var fs = require('fs');
var dataBase = './data.json';

exports.findAll = function(callback){
	fs.readFile(dataBase,'utf8',function(err,data){
		if(err){
			return callback(err)
		}
		var fileData = JSON.parse(data).students;
		
		callback(null,fileData)
	})
}

exports.save = function(newStudent,callback){
	fs.readFile(dataBase,'utf8',function(err,data){
		if(err){
			return callback(err)
		}
		var fileData =JSON.parse(data).students;
		if(fileData.length === 0){
			newStudent.id = 1;
		} else {
			newStudent.id = fileData[fileData.length - 1].id + 1;
		}
		fileData.push(newStudent);
		var newFile = JSON.stringify({students:fileData});

		fs.writeFile(dataBase,newFile,function(err){
			if(err){
				return callback(err)
			}
			callback(null)
		})
	})
}

exports.findId = function(studentId,callback){
	fs.readFile(dataBase,'utf8',function(err,data){
		if(err){
			return callback(err)
		}
		var fileData = JSON.parse(data).students;
		
		var result = fileData.find(function(item){
			return item.id === parseInt(studentId)
		})

		callback(null,result)
	})
}

exports.edit = function(editStudent,callback){
	fs.readFile(dataBase,'utf8',function(err,data){
		if(err){
			return callback(err)
		}
		var fileData = JSON.parse(data).students;
		editStudent.id = parseInt(editStudent.id);
		var result = fileData.find(function(item){
			return item.id === editStudent.id;
		})
		
		for(var key in result){
			result[key] = editStudent[key];
		}
		
		var newFile = JSON.stringify({students:fileData});

		fs.writeFile(dataBase,newFile,function(err){
			if(err){
				return callback(err)
			}
			callback(null)
		})
	})
}

exports.delete = function(studentId,callback){
	fs.readFile(dataBase,'utf8',function(err,data){
		if(err){
			return callback(err)
		}
	
		var fileData = JSON.parse(data).students;
		var editId = parseInt(studentId.id);

		var index = fileData.findIndex(function(item){
			return item.id === editId
		})

		fileData.splice(index,1)

		var newFile = JSON.stringify({students:fileData})

		fs.writeFile(dataBase,newFile,function(err){
			if(err){
				return callback(err)
			}
			callback(null)
		})	
	})
}