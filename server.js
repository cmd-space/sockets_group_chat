var express = require('express');
var path = require('path');
var app = express();

app.use(express.static(path.join(__dirname, './static')));

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res){
    res.render('index');
});

var server = app.listen(8000, function(){
    console.log('listening on port 8000');
});

var io = require('socket.io').listen(server);

var chatters = {};

io.sockets.on('connection', function(socket){
    console.log('Using sockets!');
    console.log(socket.id);
//    io.emit('count_increased', {count: counter});
//    socket.on('increase_count', function(){
//        counter += 1;
//        io.emit('count_increased', {count: counter});
//        console.log(counter);
//        return counter;
//    });
//    socket.on('reset_counter', function(){
//        counter = 0;
//        io.emit('counter_null', {count: counter});
//        return counter;
//    });
});