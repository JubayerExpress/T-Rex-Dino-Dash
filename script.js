const dino = document.getElementById("dino");
const obstacle = document.getElementById("obstacle");
const gameOver = document.getElementById("gameOver");
const scoreDisplay = document.getElementById("score");
const restartBtn = document.getElementById("restartBtn");

let isJumping = false;
let isGameOver = false;
let score = 0;
let gameSpeed = 2000;

document.addEventListener("keydown", function (event) {
    if (event.code === "Space" && !isGameOver) {
        jump();
    }
});

restartBtn.addEventListener("click", function () {
    location.reload(); // Reload page to restart the game
});

function jump() {
    if (isJumping) return;
    let position = 0;
    isJumping = true;
    const jumpInterval = setInterval(function () {
        if (position >= 150) {
            clearInterval(jumpInterval);
            let fallInterval = setInterval(function () {
                if (position <= 0) {
                    clearInterval(fallInterval);
                    isJumping = false;
                }
                position -= 20;
                dino.style.bottom = position + "px";
            }, 20);
        } else {
            position += 20;
            dino.style.bottom = position + "px";
        }
    }, 20);
}

function moveObstacle() {
    if (isGameOver) return;
    obstacle.style.animation = `moveObstacle ${gameSpeed / 1000}s linear infinite`;
}

function updateScore() {
    if (isGameOver) return;
    score++;
    scoreDisplay.innerText = `Score: ${score}`;
    // Increase speed of obstacle every 50 points
    if (score % 50 === 0 && gameSpeed > 500) {
        gameSpeed -= 100;
        moveObstacle();
    }
}

const checkCollision = setInterval(function () {
    const dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue("bottom"));
    const obstacleLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue("right"));

    if (obstacleLeft >= 50 && obstacleLeft <= 120 && dinoTop <= 50) {
        gameOver.style.display = "block";
        obstacle.style.animation = "none";
        isGameOver = true;
        clearInterval(checkCollision);
        clearInterval(scoreInterval);
        restartBtn.style.display = "block";
    }
}, 10);

const scoreInterval = setInterval(updateScore, 100); // Update score every 100ms
moveObstacle();
