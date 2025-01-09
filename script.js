const dino = document.getElementById("dino");
const obstacle = document.getElementById("obstacle");
const gameOver = document.getElementById("gameOver");

let isJumping = false;
let isGameOver = false;

document.addEventListener("keydown", function (event) {
    if (event.code === "Space") {
        jump();
    }
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

const checkCollision = setInterval(function () {
    const dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue("bottom"));
    const obstacleLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue("right"));

    if (obstacleLeft >= 50 && obstacleLeft <= 120 && dinoTop <= 50) {
        gameOver.style.display = "block";
        obstacle.style.animation = "none";
        isGameOver = true;
        clearInterval(checkCollision);
    }
}, 10);
