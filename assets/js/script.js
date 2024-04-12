const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');
const audio = new Audio('./assets/audio/audio.mp3');
const audioFundo = new Audio('./assets/audio/somFundo.mp3');
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

  if (direction === 'right' && direction !== 'left') {
    snake.shift();
    snake.push({ x: head.x + size, y: head.y });
  }
  if (direction === 'left' && direction !== 'right') {
    snake.shift();
    snake.push({ x: head.x - size, y: head.y });
  }
  if (direction === 'down' && direction !== 'up') {
    snake.shift();
    snake.push({ x: head.x, y: head.y + size });
  }
  if (direction === 'up' && direction !== 'down') {
    snake.shift();
    snake.push({ x: head.x, y: head.y - size });
  }
  audioFundo.play();
}

function gameloop() {
  clearInterval(idLoop);
  limparCanvas();
  grid();
  snakeMovement();
  drawSnake();
  drawFruta();
  colidionFruit();
  autoColidion();
  idLoop = setInterval(() => {
    gameloop();
  }, 100);
}

gameloop();

document.addEventListener('keydown', ({ key }) => {
  if (key === 'ArrowRight' && direction !== 'left') {
    setTimeout(() => {
      direction = 'right';
    });
  }
  if (key === 'ArrowLeft' && direction !== 'right') {
    setTimeout(() => {
      direction = 'left';
    });
  }

  if (key === 'ArrowUp' && direction !== 'down') {
    setTimeout(() => {
      direction = 'up';
    });
  }

  if (key === 'ArrowDown' && direction !== 'up') {
    setTimeout(() => {
      direction = 'down';
    });
  }
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
    contarPontos(size);
    setTimeout(() => {
      snake.push(fruta);
      setTimeout(() => {
        fruta.x = gerarPosicaoX();
        fruta.y = gerarPosicaoY();
      }, 100);
    });
  }
}

function autoColidion() {
  const cabeça = snake[snake.length - 1];
  snake.slice(0, -1).forEach((item) => {
    if (item.x === cabeça.x && item.y === cabeça.y) {
      setTimeout(() => {
        direction = '';
        gameover();
      }, 200);
    }
  });
}

function gameover() {
  const displayGameOver = document.querySelector('.gameover');
  displayGameOver.style.display = 'flex';
  contexto.filter = 'blur(4px)';
  direction = '';
  contagem = 0;
  clearInterval(idLoop);
  audioFundo.pause();
  document.removeEventListener('keydown', { key });
}
let contagem = 0;
function contarPontos(ponto) {
  const pontos = document.querySelector('h1 span');
  contagem += 30;

  pontos.innerHTML = contagem;
}
