let timer;
let score = 0;
let gameInterval;
let gameActive = false;
let path = document.getElementById('path');
let gameArea = document.getElementById('game-area');
let timerDisplay = document.getElementById('timer');
let scoreDisplay = document.getElementById('score');
let speedInput = document.getElementById('speed');

let pathSpeed = 200;  // Velocidad por defecto (200ms)
const gameTime = 180;  // Duración del juego en segundos

// Iniciar el juego
document.getElementById('startBtn').addEventListener('click', startGame);

function startGame() {
    if (gameActive) return;// Evita que inicie el juego si ya está activo
    gameActive = true;
    document.getElementById("speed-selection").classList.add("hidden");
    document.getElementById("instructions").classList.add("hidden");
    document.getElementById("startBtn").classList.add("hidden");
    document.getElementById("timer").classList.remove("hidden");
    
    // Obtener la velocidad ingresada
    pathSpeed = parseInt(speedInput.value) || 200;  // Usar la velocidad ingresada, si no es válida usar 200
    
    startTimer();
    movePath();
}

// Temporizador
function startTimer() {
    let timeLeft = gameTime;
    timerDisplay.textContent = `Tiempo restante: ${formatTime(timeLeft)}`;

    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = `Tiempo restante: ${formatTime(timeLeft)}`;

        if (timeLeft <= 0) {
            clearInterval(timer);
            gameOver();
        }
    }, 1000);
}

// Formato de tiempo
function formatTime(seconds) {
    let min = Math.floor(seconds / 60);
    let sec = seconds % 60;
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
}

// Mover el punto de forma aleatoria
function movePath() {
    gameInterval = setInterval(() => {
        const x = Math.random() * (gameArea.offsetWidth - 10);
        const y = Math.random() * (gameArea.offsetHeight - 10);

        path.style.left = `${x}px`;
        path.style.top = `${y}px`;
    }, pathSpeed);
}

// Fin del juego
function gameOver() {
    gameActive = false;
    clearInterval(gameInterval);
    alert('¡Juego terminado!');
    
}