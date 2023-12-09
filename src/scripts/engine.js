const state = {
  view: {
    squares: document.querySelectorAll(".square"),
    enemy: document.querySelector(".enemy"),
    timeLeft: document.querySelector("#time-left"),
    score: document.querySelector("#score"),
    lives: document.querySelector("#lives")
  },
  values: {
    gameVelocity: 500,
    hitPosition: 0,
    result: 0,
    currentTime: 60,
    initialLives: 3
  },
  action: {
    timerId:  setInterval(randomSquare, 500),
    countDownTimerId: setInterval(countDown, 1000),
  }
}

function countDown() {
  state.values.currentTime --
  state.view.timeLeft.textContent = state.values.currentTime

  if(state.values.currentTime <= 0) {
    clearInterval(state.action.countDownTimerId)
    clearInterval(state.action.timerId)
    alert("Game Over! Sua pontuação foi de: " + state.values.result)
    window.location.reload()
  }
}

function playSound(soundName) {
  let audio = new Audio(`./src/sounds/${soundName}`)
  audio.volume = 0.2
  audio.play()
}

function randomSquare() {
  state.view.squares.forEach((square) => {
    square.classList.remove("enemy")
  })

  let randomNumber = Math.floor(Math.random() * 9)
  let randomSquare = state.view.squares[randomNumber]
  randomSquare.classList.add("enemy")
  state.values.hitPosition = randomSquare.id
}


function addListenerHitBox() {
  state.view.squares.forEach((square) => {
    square.addEventListener('mousedown', () => {
      if(square.id === state.values.hitPosition) {
          state.values.result ++
          state.view.score.textContent = state.values.result
          state.values.hitPosition = null
          playSound("hit-sound.wav")
      }
      else {
        state.values.initialLives--
        state.view.lives.textContent = state.values.initialLives
        if(state.values.initialLives === 0) {
          window.alert("PERDEU KKKKKK")
          window.location.reload()
        }
      }
    })
  })
}

function initialize() {
  playSound("endGame-sound.wav")
  addListenerHitBox()
}

initialize()