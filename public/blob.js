// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/ZjVyKXp9hec

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}


function Blob(x, y, r) {
  this.pos = createVector(x, y);
  this.r = r;
  this.vel = createVector(0, 0);
  this.color = [getRandomInt(255), getRandomInt(255), getRandomInt(255)]

  // this.color = getRandomInt(255);

  this.update = function() {
    var newvel = createVector(mouseX - width / 2, mouseY - height / 2);
    newvel.div(50);
    //newvel.setMag(3);
    newvel.limit(3);
    this.vel.lerp(newvel, 0.2);
    this.pos.add(this.vel);
  };

  this.eats = function(other){
    var distance = p5.Vector.dist(this.pos,other.pos);
    if ( distance < this.r + other.r ){
        
        var sum = PI * this.r * this.r + PI * other.r * other.r  // сумма площадей нашей капли и той что сьели
        this.r = sqrt(sum/PI) // area = pi * r^2 => r = sqrt(area/pi)
        
        return true
    } else {
        return false
    }
} 

  this.constrain = function() {
    blob.pos.x = constrain(blob.pos.x, -width / 4, width / 4);
    blob.pos.y = constrain(blob.pos.y, -height / 4, height / 4);
  };

  this.show = function() {
    fill(this.color);
    ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2);
  };
}
