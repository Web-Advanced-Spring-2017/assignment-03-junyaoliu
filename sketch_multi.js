
// ITP Networked Media, Fall 2014
// https://github.com/shiffman/itp-networked-media
// Daniel Shiffman

// Keep track of our socket connection
var socket;
socket = io.connect('http://localhost:3000');

var player1 = function( p ) {

  var x = 100;
  var y = 100;
  var canvas;

  p.setup = function() {

    canvas = p.createCanvas(400, 400);
    canvas.position (100,100);
    canvas.background(0);
  }

  p.draw = function() {
    p.background(0);
    p.fill(255);
    p.rect(x,y,50,50);
  }

  p.mouseDragged = function() {

    //if(p.mouseX > canvas.position.x && p.mouseX < canvas.position.x + canvas.width &&)
    // Draw some white circles
    p.fill(255);
    p.noStroke();
    p.ellipse(p.mouseX,p.mouseY,10,10);
    // Send the mouse coordinates
    sendmouse(p.mouseX,p.mouseY);
  }


  // Function for sending to the socket
  function sendmouse(xpos, ypos) {
    // We are sending!
    console.log("sendmouse: " + xpos + " " + ypos);

    // Make a little object with  and y
    var data = {
      x: xpos,
      y: ypos
    };
    // Send that object to the socket
    socket.emit('mouse',data);
  }

};


var player2 = function( p2 ) {
  var socket;
  var x = 100;
  var y = 100;
  var canvas;

  p2.setup = function() {
    canvas = p2.createCanvas(400, 400);
    canvas.position (600,100);
    canvas.background(0);
  }

  p2.draw = function() {
    p2.background(0);
    p2.fill(255);
    p2.rect(x,y,50,50);
  }

  function mouseDraw(data){
    console.log('player2 mouse data came in: ', data);
    //draw player2 mouse data
  }

};
var myp5 = new p5(player1);
var myp52 = new p5(player2);

socket.on('player2mouse', function(data){
  console.log('got player2mousedata:', data);
});
// socket.on('player3mouse', player3.mouseDraw);
// socket.on('player4mouse', player4.mouseDraw);
