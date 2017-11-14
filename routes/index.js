const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

mongoose.connect('mongodb://ec2-54-193-37-21.us-west-1.compute.amazonaws.com/commentDB', {
    useMongoClient: true
});

const commentSchema = mongoose.Schema({
    Name: String,
    Comment: String
});

const Comment = mongoose.model('Comment', commentSchema);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connected');
});

router.get('/', (request, response, next) => {
    response.render('index', { title: 'Express' });
});

router.get('/comment', (request, response, next) => {
    console.log('In the GET route');
    Comment.find((error, commentList) => {
        if (error) {
            return console.error(error);
        } else {
            response.json(commentList);
        }
    });
});

router.post('/comment', (request, response, next) => {
    let newcomment = new Comment(request.body);
    console.log(newcomment);
    newcomment.save((error, post) => {
        if (error) {
            return console.error(error);
        }
        response.sendStatus(200);
    });
});

router.delete('/comment', (request, response, next) => {
    db.getCollection("commentDB").remove((error, post) => {
        if (error) {
            return console.error(error);
        }
        response.sendStatus(200);
    });
});

module.exports = router;
