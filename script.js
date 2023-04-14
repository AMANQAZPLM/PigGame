'use strict';

const score0 = document.getElementById('score--0');
const score1 = document.getElementById('score--1');
const dice = document.querySelector('.dice');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

// Starting conditions

score0.textContent = 0;
score1.textContent = 0;

// Hide dice
dice.classList.add('hidden');

let scoreArr = [0, 0];
let currScore = 0;
let activePlayer = 0;
let playing = true; // game state

function switchPlayer() {
  currScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer == 0 ? 1 : 0;

  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
}

// Roll dice
btnRoll.addEventListener('click', function () {
  if (playing) {
    // generate random number
    const randomNum = Math.trunc(Math.random() * 6) + 1;
    console.log(randomNum);
    // image according to random number
    dice.classList.remove('hidden');
    dice.src = `dice-${randomNum}.png`;

    // if random number is 1
    if (randomNum !== 1) {
      currScore += randomNum;
      document.getElementById(`current--${activePlayer}`).textContent =
        currScore;
    } else {
      switchPlayer();
    }
  }
});

// hold the value
btnHold.addEventListener('click', function () {
  if (playing) {
    scoreArr[activePlayer] += currScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scoreArr[activePlayer];

    if (scoreArr[activePlayer] >= 20) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');

      dice.classList.add('hidden');

      document.querySelector(`#current--${activePlayer}`).textContent = 0;
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', function () {
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  player0El.classList.add('player--active');
  playing = true;
  scoreArr = [0, 0];
  currScore = 0;
  activePlayer = 0;
  score0.textContent = 0;
  score1.textContent = 0;
});
