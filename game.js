var canvas, ctx, score = 0, gameActive, gameControl, x = 7;

window.onload = function() {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  document.addEventListener("keydown", changeDirection);
  gameControl = startGame(x);
};
      
function startGame(x) {
  gameActive = true;
  document.getElementById("game-score").innerHTML = "<h5>Score: " + score + "</h5>";
  return setInterval(draw, 1000 / x);
}

function pauseGame() {
  clearInterval(gameControl);
  gameActive = false;
}

function gameOver(x) {
  clearInterval(gameControl);
  gameActive = false;
  document.getElementById("game-status").innerHTML = "<h2>Game Over</h2>";
  document.getElementById("score").innerHTML = "<h6>Your final score is: " + score + "</h6>";
}
      

var gridSize = (tileSize = 24); 
var nextX = (nextY = 0);
var defaultTailSize = 1;
var tailSize = defaultTailSize;
var snakeTrail = [];
var snakeX = (snakeY = 10);
var appleX = (appleY = 15);

function draw() {
  snakeX += nextX;
  snakeY += nextY;

  if (snakeX < 0) {
    gameOver();
  }
  if (snakeX > gridSize-1) { 
    gameOver();
  }
  if (snakeY < 0) {
    gameOver();
  }
  if (snakeY > gridSize - 1) {
    gameOver();
  } 

  if (snakeX == appleX && snakeY == appleY) {
    ++tailSize;
    ++score;
    document.getElementById("game-score").innerHTML = "<h5>Score: " + score + "</h5>";
    appleX = Math.floor(Math.random() * gridSize);
    appleY = Math.floor(Math.random() * gridSize);
  }

  ctx.fillStyle = "rgb(15, 171, 243)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
        

  for (var i = 0; i < snakeTrail.length; ++i) { 
    if (i == 0) {
      ctx.fillStyle = "rgb(22, 82, 10)";
      ctx.fillRect(
      snakeTrail[i].x * tileSize,
      snakeTrail[i].y * tileSize,
      tileSize,
      tileSize);
    }
    if(i > 0) {
      ctx.fillStyle = "rgb(158, 88, 8)";
      ctx.fillRect(
      snakeTrail[i].x * tileSize,
      snakeTrail[i].y * tileSize,
      tileSize,
      tileSize);
    } 

    if (snakeTrail[i].x == snakeX && snakeTrail[i].y == snakeY) {
      if (tailSize >= 3) {
        gameOver();
      }
    } 
  } 
  ctx.fillStyle = "red";
  ctx.fillRect(appleX * tileSize, appleY * tileSize, tileSize, tileSize);
  
	snakeTrail.push({ x: snakeX, y: snakeY });
  while (snakeTrail.length > tailSize) {
      snakeTrail.shift();
  } 
}
function changeDirection(e) {
  const goUp = nextY === -1;
  const goDown = nextY === 1;
  const goRight = nextX === 1;
  const goLeft = nextX === -1;
  if (e.keyCode == 37 && !goRight) {
    nextX = -1;
    nextY = 0;
  }
  if (e.keyCode == 38 && !goDown) {
    nextX = 0;
    nextY = -1;
  }
  if (e.keyCode == 39 && !goLeft) {
    nextX = 1;
    nextY = 0;
  }
  if (e.keyCode == 40 && !goUp) {
    nextX = 0;
    nextY = 1;
  }
  if (e.keyCode == 32) {
    if (gameActive == true) {
      pauseGame();
    }
    else {
      gameControl = startGame(x);
    }    
  }
}
 