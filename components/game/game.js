export function runGame(onFinish) {
  let canvas = document.getElementById("game");
  let ctx = canvas.getContext("2d");
  let ballRadius = 10;
  let x = canvas.width/2;
  let y = canvas.height-30;
  let dx = 5;
  let dy = -5;
  let paddleHeight = 10;
  let paddleWidth = 75;
  let paddleX = (canvas.width-paddleWidth)/2;
  let rightPressed = false;
  let leftPressed = false;
  let brickRowCount = 5;
  let brickColumnCount = 3;
  let brickWidth = 75;
  let brickHeight = 20;
  let brickPadding = 10;
  let brickOffsetTop = 30;
  let brickOffsetLeft = 30;
  let score = 0;
  let lives = 3;
  let timeScore = 99999;
  let finish = false;

  let bricks = [];

  function generateBricks() {
    for(let c=0; c<brickColumnCount; c++) {
      bricks[c] = [];
      for(let r=0; r<brickRowCount; r++) {
          bricks[c][r] = { x: 0, y: 0, status: 1 };
      }
    }
  }

  generateBricks();


  document.addEventListener("keydown", keyDownHandler, false);
  document.addEventListener("keyup", keyUpHandler, false);
  document.addEventListener("mousemove", mouseMoveHandler, false);

  function keyDownHandler(e) {
      if(e.code  == "ArrowRight") {
          rightPressed = true;
      }
      else if(e.code == 'ArrowLeft') {
          leftPressed = true;
      }
  }
  function keyUpHandler(e) {
      if(e.code == 'ArrowRight') {
          rightPressed = false;
      }
      else if(e.code == 'ArrowLeft') {
          leftPressed = false;
      }
  }
  function mouseMoveHandler(e) {
      let relativeX = e.clientX - canvas.offsetLeft;
      if(relativeX > 0 && relativeX < canvas.width) {
          paddleX = relativeX - paddleWidth/2;
      }
  }
  function collisionDetection() {
      for(let c=0; c<brickColumnCount; c++) {
          for(let r=0; r<brickRowCount; r++) {
              let b = bricks[c][r];
              if(b.status == 1) {
                  if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                      dy = -dy;
                      b.status = 0;
                      score++;
                      if(score == brickRowCount*brickColumnCount) {
                        finish = true;
                        onFinish(timeScore);
                      }
                  }
              }
          }
      }
  }

  function drawBall() {
      ctx.beginPath();
      ctx.arc(x, y, ballRadius, 0, Math.PI*2);
      ctx.fillStyle = "#0095DD";
      ctx.fill();
      ctx.closePath();
  }
  function drawPaddle() {
      ctx.beginPath();
      ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
      ctx.fillStyle = "#0095DD";
      ctx.fill();
      ctx.closePath();
  }
  function drawBricks() {
      for(let c=0; c<brickColumnCount; c++) {
          for(let r=0; r<brickRowCount; r++) {
              if(bricks[c][r].status == 1) {
                  let brickX = (r*(brickWidth+brickPadding))+brickOffsetLeft;
                  let brickY = (c*(brickHeight+brickPadding))+brickOffsetTop;
                  bricks[c][r].x = brickX;
                  bricks[c][r].y = brickY;
                  ctx.beginPath();
                  ctx.rect(brickX, brickY, brickWidth, brickHeight);
                  ctx.fillStyle = "#0095DD";
                  ctx.fill();
                  ctx.closePath();
              }
          }
      }
  }
  function drawScore() {
      ctx.font = "16px Arial";
      ctx.fillStyle = "#0095DD";
      ctx.fillText("Score: "+timeScore, 8, 20);
  }
  function drawLives() {
      ctx.font = "16px Arial";
      ctx.fillStyle = "#0095DD";
      ctx.fillText("Lives: "+lives, canvas.width-65, 20);
  }

  function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawBricks();
      drawBall();
      drawPaddle();
      drawScore();
      drawLives();
      collisionDetection();

      if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
          dx = -dx;
      }
      if(y + dy < ballRadius) {
          dy = -dy;
      }
      else if(y + dy > canvas.height-ballRadius) {
          if(x > paddleX && x < paddleX + paddleWidth) {
              dy = -dy;
          }
          else {
              lives--;
              timeScore -= 1800;
              if(!lives) {
                finish = true;
                lives = 0;
              }
              else {
                  x = canvas.width/2;
                  y = canvas.height-30;
                  dx = 5;
                  dy = -5;
                  paddleX = (canvas.width-paddleWidth)/2;
              }
          }
      }

      if(rightPressed && paddleX < canvas.width-paddleWidth) {
          paddleX += 7;
      }
      else if(leftPressed && paddleX > 0) {
          paddleX -= 7;
      }

      x += dx;
      y += dy;
      if (!finish) {
        requestAnimationFrame(draw);
      }
  }

  setInterval(() => {
    timeScore -= 999
  }, 200)

  draw()
}