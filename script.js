const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 200;

let dino = {
    x: 50,
    y: canvas.height - 40,
    width: 40,
    height: 40,
    dy: 0,
    gravity: 0.6,
    jumpPower: -12,
    isJumping: false,
    isGrounded: true
};

let obstacles = [];
let frame = 0;
let score = 0;
let gameOver = false;

function drawDino() {
    ctx.fillStyle = 'green';
    ctx.fillRect(dino.x, dino.y, dino.width, dino.height);
}

function drawObstacles() {
    ctx.fillStyle = 'red';
    obstacles.forEach(obstacle => {
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    });
}

function updateObstacles() {
    if (frame % 100 === 0) {
        let height = Math.random() * (40 - 20) + 20; // Random height between 20 and 40
        let obstacle = {
            x: canvas.width,
            y: canvas.height - height,
            width: 20,
            height: height
        };
        obstacles.push(obstacle);
    }

    obstacles.forEach(obstacle => {
        obstacle.x -= 4;
    });

    obstacles = obstacles.filter(obstacle => obstacle.x > -obstacle.width);
}

function detectCollision() {
    for (let obstacle of obstacles) {
        if (
            dino.x < obstacle.x + obstacle.width &&
            dino.x + dino.width > obstacle.x &&
            dino.y < obstacle.y + obstacle.height &&
            dino.y + dino.height > obstacle.y
        ) {
            return true;
        }
    }
    return false;
}

function handleJump() {
    dino.dy += dino.gravity;
    dino.y += dino.dy;

    if (dino.y >= canvas.height - dino.height) {
        dino.y = canvas.height - dino.height;
        dino.isGrounded = true;
        dino.dy = 0;
    }
}

function updateScore() {
    score++;
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`, 700, 50);
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawDino();
    drawObstacles();
    updateObstacles();
    updateScore();
    handleJump();

    if (detectCollision()) {
        document.getElementById('game-over').style.display = 'block';
        gameOver = true;
    }

    frame++;

    if (!gameOver) {
        requestAnimationFrame(gameLoop);
    }
}

document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && dino.isGrounded) {
        dino.isJumping = true;
        dino.isGrounded = false;
        dino.dy = dino.jumpPower;
    }
});

gameLoop();
