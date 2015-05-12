var express = require('express');
var session = require('express-session');
var path = require('path');
var app = express();

app.use(express.static(path.join(__dirname, './static')));
app.use(session({secret: 'testingtesting'}));

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res){
    res.render('index');
});

var server = app.listen(8000, function(){
    console.log('listening on port 8000');
});

var io = require('socket.io').listen(server);

var messages = [];

io.sockets.on('connection', function(socket){
    console.log('Using sockets!');
    console.log(socket.id);
    io.emit('post_messages', {messages: messages});
    socket.on('new_message', function(data){ 
        messages.push({name: data.name, message: data.message});
        console.log(messages);
        io.emit('post_messages', {messages: messages});
    });
});