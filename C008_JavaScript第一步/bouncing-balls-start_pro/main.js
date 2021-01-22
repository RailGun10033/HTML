//定义积分
const para = document.querySelector('p');
let count = 0;

// 设置画布

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// 生成随机数的函数

function random(min,max) {
  const num = Math.floor(Math.random() * (max - min)) + min;
  return num;
}

function randomColor() {
  return 'rgb(' + random(0, 255) + ', ' + random(0, 255) + ', '+ random(0, 255) + ')';
}

function Shape(x, y, xVel, yVel, exist) {
  this.x    = x;
  this.y    = y;
  this.xVel = xVel;
  this.yVel = yVel;
  this.exist = exist;
}

function Ball(x, y, xVel, yVel, color, size, exist) {
  Shape.call(this, x, y, xVel, yVel, exist);
  this.color = color;
  this.size = size;
}

Ball.prototype = Object.create(Shape.prototype);
Ball.prototype.constructor = Ball;

Ball.prototype.draw = function() {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.fill();
}

Ball.prototype.update = function () {
  if ((this.x - this.size) <= 0 || (this.x + this.size) >= width) {
    this.xVel = -this.xVel;
  }

  if ((this.y - this.size) <= 0 || (this.y + this.size) >= height) {
    this.yVel = -this.yVel;
  }

  this.x += this.xVel;
  this.y += this.yVel;
}

Ball.prototype.collisionDectect = function() {
  for (let i = 0; i < balls.length; i++) {
    if (this != balls[i]) {
      const dx = this.x - balls[i].x;
      const dy = this.y - balls[i].y;
      const distance = Math.sqrt(dx*dx + dy*dy);

      if (distance < this.size + balls[i].size) {
        balls[i].color = this.color = randomColor();
      }
    }
    
  }
}

function EvilCircle(x, y,exist) {
  Shape.call(this, width/2, height/2, 20, 20, exist);
  this.color = 'white';
  this.size = 10;
}

EvilCircle.prototype = Object.create(Shape.prototype);
EvilCircle.prototype.constructor = EvilCircle;

EvilCircle.prototype.draw = function(){
  ctx.beginPath();
  ctx.strokeStyle = this.color;
  ctx.lineWidth = 3;
  ctx.arc(this.x,this.y, this.size, 0, Math.PI * 2);
  ctx.stroke();
}

EvilCircle.prototype.checkBounds = function(){
  if (this.x <= this.size || this.x >= width - this.size) {
    this.xVel = -this.xVel;
  }

  if (this.y <= this.size || this.y >= height - this.size) {
    this.yVel = -this.yVel;
  }
}

EvilCircle.prototype.setControl = function(e){
  var _this = this;

  window.onkeydown = function(e){
    if (e.key === 'a') {
      _this.x -= _this.xVel;
    }else if (e.key === 's') {
     _this.y += _this.yVel; 
    }else if (e.key === 'w'){
      _this.y -= _this.yVel;
    }else if (e.key === 'd'){
      _this.x += _this.xVel;
    }
  };
}

EvilCircle.prototype.collisionDectect = function(){
  for (let index = 0; index < balls.length; index++) {
    if (balls[index].exist) {
      const dx = this.x - balls[index].x;
      const dy = this.y - balls[index].y;
      const distance = Math.sqrt(dx*dx + dy*dy);

      if (distance <= this.size + balls[index].size) {
        balls[index].exist = false;
        count += 1;
        para.innerText = 'Ball count:' + count;
      }
    }
    
  }
}


let balls = [];
while (balls.length < 25) {
  let size = random(10, 20);
  let ball = new Ball(
    random(0+size, width-size),
    random(0+size, height-size),
    random(-7, 7),
    random(-7, 7),
    randomColor(),
    size,
    true
  );

  balls.push(ball);
}

let evilCircle = new EvilCircle(100, 100, true);
evilCircle.draw();
evilCircle.setControl();

function loop() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  ctx.fillRect(0, 0, width, height);

  for (let index = 0; index < balls.length; index++) {
    if (balls[index].exist) {
      balls[index].draw();
      balls[index].update();
      balls[index].collisionDectect();
    }
  }

  evilCircle.draw();
  evilCircle.checkBounds();
  evilCircle.collisionDectect();

  requestAnimationFrame(loop);
}

loop();
