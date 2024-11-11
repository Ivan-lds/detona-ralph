const state = {
  view: {
    squares: document.querySelectorAll(".square"),
    enemys: document.querySelector(".enemy"),
    timeLeft: document.getElementById("time-left"),
    score: document.getElementById("score"),
  },
  values: {
    timerId: null,
    countdownTimerId: setInterval(countdown, 1000),
    gameVelocity: 1000,
    hitPosition: 0,
    result: 0,
    curretTime: 60,
  },
};

function playSound(audioName) {
  let audio = new Audio(`audios/${audioName}.m4a`);
  audio.volume = 0.5;
  audio.play();
}

function countdown() {
  state.values.curretTime--;
  state.view.timeLeft.textContent = state.values.curretTime;
  if (state.values.curretTime === 0) {
    clearInterval(state.values.countdownTimerId);
    clearInterval(state.values.timerId);
    alert("GAME OVER !!!, o seu resultado foi: " + state.values.result);
  }
}

function randomSquare() {
  state.view.squares.forEach((square) => {
    square.classList.remove("enemy"); //remove a classe enemy de todos os quadrados.
  });

  let randomNumber = Math.floor(Math.random() * 9) + 1; //gerar um numero aleatorio entre 1 e 9. floor para arredondar para baixo.
  let randomSquare = state.view.squares[randomNumber];
  randomSquare.classList.add("enemy");
  state.values.hitPosition = randomSquare.id;
}

function moveEnemy() {
  state.values.timerId = setInterval(randomSquare, state.values.gameVelocity);
}

function addListenerHitBox() {
  state.view.squares.forEach((square) => {
    square.addEventListener("mousedown", () => {
      if (square.id === state.values.hitPosition) {
        state.values.result++;
        state.view.score.textContent = state.values.result;
        state.values.hitPosition = null;
        playSound(hit);
      }
    });
  });
}

function init() {
  moveEnemy();
  addListenerHitBox();
}

init();
