// Daniel Shiffman
// http://codingtra.in
// Steering Text Paths
// Video: https://www.youtube.com/watch?v=4hA7G3gup-4

class Vehicle {
  constructor(x, y) {
    this.home = createVector(random(width), random(height));
    this.pos = this.home.copy();
    this.target = createVector(x, y);
    this.vel = p5.Vector.random2D();
    this.acc = createVector();
    this.pointColor = color(random(45, 255), random(45, 255), random(45, 255))
    this.r = 6;
    this.maxspeed = 10;
    this.maxforce = 1;
  }

  behaviors() {
  var arrive = this.arrive(this.target);

  // Always apply the arrive force
  this.applyForce(arrive);

  if (touches.length > 0 && touches[0]) {
    // Use the first touch if there are active touches
    var targetVector = createVector(touches[0].x, touches[0].y);
    var flee = this.flee(targetVector);

    flee.mult(5);
    this.applyForce(flee);
  }
  }

  applyForce(f) {
    this.acc.add(f);
  }

  update() {
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.acc.mult(0);
  }

  show() {
    stroke(this.pointColor);
    strokeWeight(this.r);
    point(this.pos.x, this.pos.y);
  }


  arrive(target) {
    var desired = p5.Vector.sub(target, this.pos);
    var d = desired.mag();
    var speed = this.maxspeed;
    if (d < 100) {
      speed = map(d, 0, 100, 0, this.maxspeed);
    }
    desired.setMag(speed);
    var steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxforce);
    return steer;
  }

  flee(target) {
    var desired = p5.Vector.sub(target, this.pos);
    var d = desired.mag();
    if (d < 100) {
      desired.setMag(this.maxspeed);
      desired.mult(-1);
      var steer = p5.Vector.sub(desired, this.vel);
      steer.limit(this.maxforce);
      return steer;
    } else {
      return createVector(0, 0);
    }
  }
}