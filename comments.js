//Create web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
//connect to mongodb
mongoose.connect('mongodb://localhost/comments');
//create a schema
var commentSchema = new mongoose.Schema({
	name: String,
	comment: String,
	created_at: {type: Date, default: Date.now}
});
//create a model
var Comment = mongoose.model('Comment', commentSchema);
//configure app
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
//setup routes
app.get('/', function(req, res){
	res.render('index');
});
app.post('/create', function(req, res){
	Comment.create(req.body, function(err, comment){
		if(err){
			console.log(err);
		}else{
			res.redirect('/comments');
		}
	});
});
app.get('/comments', function(req, res){
	Comment.find({}, function(err, comments){
		if(err){
			console.log(err);
		}else{
			res.render('comments', {comments: comments});
		}
	});
});
app.listen(3000, function(){
	console.log('Server is running on port 3000');
});