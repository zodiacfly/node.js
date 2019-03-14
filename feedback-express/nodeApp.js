

var express = require('express');
var app = express();

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

app.use('/public/',express.static('./public/'))
app.engine('html',require('express-art-template'))

app.get('/',function(request,respond){
    respond.render('index.html',{
      comments : comments
    })
})

app.get('/post',function(request,respond){
    respond.render('post.html')
})

app.get('/comments',function(request,respond){

   var newComment = request.query;
   var dt=new Date();
   var date = dt.toLocaleDateString();
   newComment.dateTime = date;
   comments.unshift(newComment)
   respond.redirect('/')

})

app.get('/haha',function(request,respond){
    respond.render('404.html')
})

app.listen(1818,function(){
  console.log('server is running')
})