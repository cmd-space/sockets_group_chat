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

var chatters = {id: "", name: ""};

io.sockets.on('connection', function(socket){
    console.log('Using sockets!');
    console.log(socket.id);
    socket.on('new_user', function(data){
        chatters.id += socket.id;
        chatters.name += data.name;
//        chatters.push(data.name);
        console.log(chatters);
    });
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