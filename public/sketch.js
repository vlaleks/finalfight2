// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/ZjVyKXp9hec

let list = document.getElementById("dashboard");
// console.log(list);
var userName;
let flag = true;
// const userName = prompt('Ваш ник');
let buttonSubmit = document.getElementById('submit');
let input = document.getElementById('name');
let form = document.getElementById('form');
console.log(buttonSubmit, input, form);
buttonSubmit.addEventListener("click", changer());

function changer(){
  flag = false;
}



while(flag){
  console.log('asdfsadfasdsadf');
  userName = input.nodeValue;
  form.style.display='none';
  console.log('startplay')
  if(flag == false){
    console.log('stop')
    break;
  }
}






// Keep track of our socket connection
var socket;

var blob;

var blobs = [];
for ( var i=0; i<100;i++){


  var x = random(-width,width)
  var y = random(-height,height)
  blobs[i] = new Blob(0,x,y,10);
}

var zoom = 1;


function drawshow(blobs) {
  
  fill(blobs.color);
  ellipse(blobs.x, blobs.y, blobs.r * 2, blobs.r * 2);

  fill(255);
  textAlign(CENTER);
  textSize(20);
  text(blobs.name, blobs.x, blobs.y+10);
};

function setup() {
  createCanvas(1300, 800);
  // Start a socket connection to the server
  // Some day we would run this server somewhere else
  // socket = io.connect('http://localhost:3000');
  socket = io();

  blob = new Blob(random(width), random(height), random(8, 24));
  // Make a little object with  and y
  var data = {
    x: blob.pos.x,
    y: blob.pos.y,
    r: blob.r,
    name: userName,
    color: blob.color
  };
  socket.emit('start', data);

  socket.on('heartbeat', function(data) {
    //console.log(data);
    blobs = data;
  });
}

function draw() {
  background(160,160,160);
  // console.log(blob.pos.x, blob.pos.y);

  translate(width / 2, height / 2);
  var newzoom = 64 / blob.r;
  zoom = lerp(zoom, newzoom, 0.1);
  scale(zoom);
  translate(-blob.pos.x, -blob.pos.y);

  blobs.sort((a, b) => a.r < b.r ? 1 : -1);
  // console.log(blobs)
  var inner = `<div class="leader_title">Leaders</div>`;
  for (var i = blobs.length - 1; i >= 0; i--) {
    var id = blobs[i].id;
    if (id.substring(2, id.length) !== socket.id) {
      inner +=`<div class="leader_people">${blobs[i].name}</div>`;
      
      drawshow(blobs[i])
    }
    
    
  }
  list.innerHTML = inner;
  

  if (mouseIsPressed) {
    blob.update();
    // console.log(blob.pos.x, blob.pos.y)
  }
  // blob.constrain();

  var data = {
    x: blob.pos.x,
    y: blob.pos.y,
    r: blob.r
  };
  socket.emit('update', data);
}
