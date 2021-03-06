

var express = require('express');

var app = express();
var server  = app.listen(3000);
app.use (express.static('public'));

var socket = require ('socket.io');
var io = socket (server);
//if I have a new connection
io. on ('connection', newConnection);

function newConnection(socket){
  console.log ('newConnection:'+ socket.id);
  console.log (socket.id);// get new connections
  socket.on ('mouse', mouseMsg);
  function mouseMsg(data){
    // socket.broadcast.emit('mouse', data);
    console.log (data);
  }
  setInterval(function(){
    io.emit('player2mouse', {x: 50, y:110});
  }, 1000);
}
// Set up the server
// process.env.PORT is related to deploying on heroku
// var server = app.listen(process.env.PORT || 3000, listen);

// // This call back just tells us that the server has started
// function listen() {
//   var host = server.address().address;
//   var port = server.address().port;
//   console.log('Example app listening at http://' + host + ':' + port);
// }

// app.use(express.static('public'));


// // WebSocket Portion
// // WebSockets work with the HTTP server
// var io = require('socket.io')(server);

// // Register a callback function to run when we have an individual connection
// // This is run for each individual user that connects
// io.sockets.on('connection',
//   // We are given a websocket object in our function
//   function (socket) {

//     console.log("We have a new client: " + socket.id);

//     // When this user emits, client side: socket.emit('otherevent',some data);
//     socket.on('mouse',
//       function(data) {
//         // Data comes in as whatever was sent, including objects
//         console.log("Received: 'mouse' " + data.x + " " + data.y);

//         // Send it to all other clients
//         socket.broadcast.emit('mouse', data);

//         // This is a way to send to everyone including sender
//         // io.sockets.emit('message', "this goes to everyone");

//       }
//     );

// //
//     socket.on('disconnect', function() {
      console.log("Client has disconnected");
//     });
//   }
// );
