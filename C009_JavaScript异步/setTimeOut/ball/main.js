var getPixelRatio = function (context) {
    var backingStore = context.backingStorePixelRatio ||
        context.webkitBackingStorePixelRatio ||
        context.mozBackingStorePixelRatio ||
        context.msBackingStorePixelRatio ||
        context.oBackingStorePixelRatio ||
        context.backingStorePixelRatio || 1;
    return (window.devicePixelRatio || 1) / backingStore;
};

const canvas = document.getElementById('cs');
const ctx = canvas.getContext('2d');
// var ratio = getPixelRatio(ctx);
// ctx.scale(ratio, ratio);

const width = canvas.width;
const height = canvas.height;
const gravity = 9.8;

console.log(width, height);


function Ball(pos, vel, size, color, isG) {
    this.pos = {
        x: pos?pos.x : 0,
        y: pos?pos.y : 0
    };

    this.vel = {
        x: vel?vel.x : 0,
        y: vel?vel.y : 0
    };

    this.size = size;

    this.color = color;

    this.isG = isG
}


Ball.prototype.draw = function() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.size, 0, Math.PI*2);
    ctx.fill();
}

Ball.prototype.update = function () {
    
    if(this.pos.x <= this.size || this.pos.x >= width - this.size){
        this.vel.x = -this.vel.x;
    }
    if(this.pos.y <= this.size || this.pos.y >= height - this.size){
        this.vel.y = -this.vel.y;
    }else{
        if (this.isG) {
            this.vel.y += gravity;
        }
    }

    

    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;

    // console.log(this.pos, this.vel);
    this.draw();
}

let ball = new Ball({x: 100, y:50}, {"x":10, "y":0},5, "rgb(255, 255,0)",true);
ball.draw;

let ballX = new Ball({x: 100, y:50}, {"x":10, "y":0},5, "rgb(255,0,0)",false);
ballX.draw;

let ballY = new Ball({x: 100, y:50}, {"x":0, "y":0},5, "rgb(0,255,0)",true);
ballY.draw;


function loop(){
    ctx.fillStyle = "rgba(0,0,0,1)";
    ctx.fillRect(0,0,width, height);
    ball.update();
    ballY.update();
    ballX.update();

    requestAnimationFrame(loop);
}
loop();

// setInterval(loop, 100);