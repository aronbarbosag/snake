const fruta = document.querySelector('.fruta');

//gerar posicao aleatória
const eixoXMaximo = window.innerWidth;
const eixoYMáximo = window.innerHeight;
const posicaoFruta = {
  x: 0,
  y: 0,
};

function gerarPosicoes() {
  posicaoFruta.x = Math.floor(Math.random() * (eixoXMaximo + 1));
  posicaoFruta.y = Math.floor(Math.random() * (eixoYMáximo + 1) * 0.6);
  atualizarPosicaoFruta();
}

function atualizarPosicaoFruta() {
  fruta.style.transform = `translate(${posicaoFruta.x}px, ${posicaoFruta.y}px)`;
}

setInterval(() => {
  gerarPosicoes();
}, 4000);
gerarPosicoes();

const snakeContainer = document.querySelector('.container');
const cabecaSnake = document.querySelector('.snake');
const posicaoSnake = {
  x: 0,
  y: 0,
};

function startMovement(event) {
  if (event.key === 'ArrowRight') {
    posicaoSnake.x += 20;
    console.log(posicaoSnake);
    cabecaSnake.style.transform = `translate(${posicaoSnake.x}px, ${posicaoSnake.y}px )`;
  }

  if (event.key === 'ArrowLeft') {
    posicaoSnake.x += -20;
    console.log(posicaoSnake);
    cabecaSnake.style.transform = `translate(${posicaoSnake.x}px, ${posicaoSnake.y}px )`;
  }

  if (event.key === 'ArrowDown') {
    posicaoSnake.y += 20;
    console.log(posicaoSnake);
    cabecaSnake.style.transform = `translate(${posicaoSnake.x}px, ${posicaoSnake.y}px )`;
  }
  if (event.key === 'ArrowUp') {
    posicaoSnake.y += -20;
    console.log(posicaoSnake);
    cabecaSnake.style.transform = `translate(${posicaoSnake.x}px, ${posicaoSnake.y}px )`;
  }
}

window.addEventListener('keydown', startMovement);
