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

function Ball(x, y, xVel, yVel, color, size) {
  this.x    = x;
  this.y    = y;
  this.xVel = xVel;
  this.yVel = yVel;
  this.color = color;
  this.size = size;

}

Ball.prototype.draw = function() {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.fill();
}

Ball.prototype.update = function () {

  console.log(this);
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


let balls = [];
while (balls.length < 25) {
  let size = random(10, 20);
  let ball = new Ball(
    random(0+size, width-size),
    random(0+size, height-size),
    random(-7, 7),
    random(-7, 7),
    randomColor(),
    size
  );

  balls.push(ball);
}


function loop() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  ctx.fillRect(0, 0, width, height);

  for (let index = 0; index < balls.length; index++) {
    balls[index].draw();
    balls[index].update();
    balls[index].collisionDectect();
  }

  requestAnimationFrame(loop);
}

loop();
