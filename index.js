var http = require('http');
var express = require('express');
var app = express();
var server = http.createServer(app);
var io = require('socket.io')(server);


const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline');
const port = new SerialPort('COM8',{baudRate:9600});
const parser = new Readline();

 //Make sure to have the latest version of seriaport installed. check the json file.
 // Here is my reference   https://www.youtube.com/watch?v=__FSpGHx9Ow&t=3s&ab_channel=VincentLab

port.pipe(parser);

app.engine('ejs', require('ejs').__express);

app.set('view engine', 'ejs');

app.get('/', function (req, res){
res.render('index');
});

parser.on('open', function(){
console.log('serial port opened');
});

io.on('connection', function(socket){
    console.log('socket.io connection');
    parser.on('data', function(data){
    data = data.trim();
    socket.emit('data', data);
    });

    socket.on('disconnect', function(){
    console.log('disconnected');
    });
});


server.listen(3000, function(){
console.log('listening on port 3000...');
});