var http = require('http');
var fs = require('fs');
var temp = require('art-template');
var url = require('url');

var comments = [
  {
    name: 'jack',
    message: 'good job！',
    dateTime: '2015-10-16'
  },
  {
    name: 'nick',
    message: 'i am goog！',
    dateTime: '2015-10-16'
  },
  {
    name: 'mike',
    message: 'lol！',
    dateTime: '2015-10-16'
  },
  {
    name: 'daniel',
    message: 'you are awsome！',
    dateTime: '2015-10-16'
  },
  {
    name: 'jimmy',
    message: 'i am fine！',
    dateTime: '2015-10-16'
  }
]
http
.createServer(function(request,respond) {

     var parseObj = url.parse(request.url,true);
     var pathName = parseObj.pathname;
     
     if(pathName === '/'){
        fs.readFile('./views/index.html',function(err,data){
          if(err){
            return respond.end('can not find file')
          }
          var result = temp.render(data.toString(),{
            comments:comments
          })
          respond.end(result)
        })
                // respond.end()
      } else if(pathName === '/post'){
        fs.readFile('./views/post.html',function(err,data){
          if(err){
             return respond.end('can not find file')
          }
          respond.end(data)
        })
      } else if(pathName.indexOf('/public/') === 0) {
        fs.readFile('.' + pathName,function(err,data){
          if(err){
            return respond.end('can not find file')
          }
          respond.end(data)
        })
      } else if(pathName === '/comments'){
          var newComment = parseObj.query;
          var dt=new Date();
          var date = dt.toLocaleDateString();
          newComment.dateTime = date;
          comments.unshift(newComment)
          respond.statusCode = 302;
          respond.setHeader('location','/')
          respond.end()
      }
      else {
        fs.readFile('./views/404.html',function(err,data){
          if(err){
            return respond.end('Can not find pages')
          }
          respond.end(data)
        })
      }
})
.listen(1818,function() {
  console.log('server is running')
})