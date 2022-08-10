let canvas = document.getElementById("snake"); //criar elemento que irá rodar o jogo
let context = canvas.getContext("2d"); //criar o bloco do jogo
let box = 32;
let snake = []; //criar cobrinha como lista, já que vai receber  coordenadas, que quando pintadas, criam os quadradinhos.
snake[0] = {
  x: 8 * box,
  y: 8 * box,
};
let directionSnake = "right";
let food = {
  x: Math.floor(Math.random() * 15 + 1) * box,
  y: Math.floor(Math.random() * 15 + 1) * box,
};

function createBG() {
  context.fillStyle = "black";
  context.fillRect(0, 0, 16 * box, 16 * box); //desenha o retângulo usando x e y e a largura e altura setadas.
}

function createSnake() {
  for (i = 0; i < snake.length; i++) {
    context.fillStyle = "red";
    context.fillRect(snake[i].x, snake[i].y, box, box);
  }
}

function createFood() {
  context.fillStyle = "pink";
  context.fillRect(food.x, food.y, box, box);
}

document.addEventListener("keydown", update);

function update(event) {
  if (event.keyCode == 37 && directionSnake != "right") directionSnake = "left";
  if (event.keyCode == 38 && directionSnake != "down") directionSnake = "up";
  if (event.keyCode == 39 && directionSnake != "left") directionSnake = "right";
  if (event.keyCode == 40 && directionSnake != "up") directionSnake = "down";
}

function iniciarJogo() {
  //criando um plano cartesiano para dar a inteção de que a snake ta em loop, se ela passar da borda da direita(x) a snake aparece na esquerda(x) isso vai acontecer para cima(y) e para baixo(y) também.
  if (snake[0].x > 15 * box && directionSnake == "right") snake[0].x = 0;
  if (snake[0].x < 0 && directionSnake == "left") snake[0].x = 16 * box;
  if (snake[0].y > 15 * box && directionSnake == "down") snake[0].y = 0;
  if (snake[0].y < 0 && directionSnake == "up") snake[0].y = 16 * box;

  //Condição de game over
  for (i = 1; i < snake.length; i++) {
    if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
      clearInterval(jogo);
      alert("Game Over! Recarregue a pagina para tentar de novo");
    }
  }

  createBG();
  createSnake();
  createFood();

  //criação da posição da snake
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  //Criar as condições de movimento da snake
  if (directionSnake == "right") snakeX += box;
  if (directionSnake == "left") snakeX -= box; //Vai estar diminuindo para dar ilusão de que ela ta indo pra esquerda(plano cartesiano).
  if (directionSnake == "up") snakeY -= box;
  if (directionSnake == "down") snakeY += box;

  if (snakeX != food.x || snakeY != food.y) {
    snake.pop(); //Retira o ultimo elemento do array.
  } else {
    food.x = Math.floor(Math.random() * 15 + 1) * box;
    food.y = Math.floor(Math.random() * 15 + 1) * box;
  }

  let newHead = {
    x: snakeX,
    y: snakeY,
  };

  snake.unshift(newHead); //Sempre acrescenta um
}
// A cada 100ms a função inicarJogo vai estar sendo renovada, dando continuidade ao jogo sem travar
let jogo = setInterval(iniciarJogo, 100);

//aula 4
