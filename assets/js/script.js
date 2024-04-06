const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');

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

let direction, idLoop;
function snakeMovement() {
  const head = snake[snake.length - 1];
  if (!direction) return;

  if (direction === 'right') {
    snake.shift();
    snake.push({ x: head.x + size, y: head.y });
    limparCanvas();
    drawSnake();
  }
  if (direction === 'left') {
    snake.shift();
    snake.push({ x: head.x - size, y: head.y });
    limparCanvas();
    drawSnake();
  }
  if (direction === 'down') {
    snake.shift();
    snake.push({ x: head.x, y: head.y + size });
    limparCanvas();
    drawSnake();
  }
  if (direction === 'up') {
    snake.shift();
    snake.push({ x: head.x, y: head.y - size });
    limparCanvas();
    drawSnake();
  }
}

function gameloop() {
  clearInterval(idLoop);
  idLoop = setInterval(() => {
    snakeMovement();
  }, 100);
}
gameloop();

document.addEventListener('keydown', ({ key }) => {
  if (key === 'ArrowRight' && direction !== 'left') direction = 'right';
  if (key === 'ArrowLeft' && direction !== 'right') direction = 'left';
  if (key === 'ArrowUp' && direction !== 'down') direction = 'up';
  if (key === 'ArrowDown' && direction !== 'up') direction = 'down';
});
