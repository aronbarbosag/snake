const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');
const audio = new Audio('./assets/audio/audio.mp3');
const size = 30;
const snake = [
  {
    x: 300,
    y: 300,
  },
  {
    x: 330,
    y: 300,
  },
  {
    x: 360,
    y: 300,
  },
];
const fruta = {
  x: 570,
  y: 30,
  color: '',
};
drawFruta();
function drawSnake() {
  contexto.fillStyle = '#ddd';
  snake.forEach((element, index) => {
    if (index === snake.length - 1) {
      contexto.fillStyle = '#fff';
    }
    setTimeout(() => {});
    contexto.fillRect(element.x, element.y, size, size);
  });
}
drawSnake();

function limparCanvas() {
  contexto.clearRect(0, 0, 600, 600);
}

function grid() {
  contexto.strokeStyle = '#242424';

  for (let i = 30; i < canvas.width; i += 30) {
    contexto.strokeRect(i, 0, 1, 600);
    contexto.strokeRect(0, i, 600, 0);
  }
}

let direction, idLoop;
function snakeMovement() {
  const head = snake[snake.length - 1];
  if (!direction) return;

  if (direction === 'right') {
    snake.shift();
    snake.push({ x: head.x + size, y: head.y });
  }
  if (direction === 'left') {
    snake.shift();
    snake.push({ x: head.x - size, y: head.y });
  }
  if (direction === 'down') {
    snake.shift();
    snake.push({ x: head.x, y: head.y + size });
  }
  if (direction === 'up') {
    snake.shift();
    snake.push({ x: head.x, y: head.y - size });
  }
}

function gameloop() {
  clearInterval(idLoop);
  limparCanvas();
  grid();
  snakeMovement();
  drawSnake();
  drawFruta();
  colidionFruit();

  idLoop = setInterval(() => {
    gameloop();
  }, 100);
}

gameloop();

document.addEventListener('keydown', ({ key }) => {
  if (key === 'ArrowRight' && direction !== 'left') direction = 'right';
  if (key === 'ArrowLeft' && direction !== 'right') direction = 'left';
  if (key === 'ArrowUp' && direction !== 'down') direction = 'up';
  if (key === 'ArrowDown' && direction !== 'up') direction = 'down';
});

function gerarPosicaoX() {
  const posicaoX = Math.floor((Math.random() * 570 + 1) / 30) * 30;
  return posicaoX;
}
function gerarPosicaoY() {
  const posicaoY = Math.floor((Math.random() * 570 + 1) / 30) * 30;
  return posicaoY;
}

function drawFruta() {
  contexto.fillStyle = 'red';
  contexto.fillRect(fruta.x, fruta.y, size, size);
}
function colidionFruit() {
  if (
    fruta.x === snake[snake.length - 1].x &&
    fruta.y === snake[snake.length - 1].y
  ) {
    audio.play();
    setTimeout(() => {
      snake.push(fruta);
      setTimeout(() => {
        fruta.x = gerarPosicaoX();
        fruta.y = gerarPosicaoY();
      }, 200);
    });
  }
}
