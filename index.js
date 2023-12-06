const guessContainer = document.querySelector('.guessContainer');
const initialContainer = document.querySelector('.initialContainer');
const guessInputZone = document.querySelector('.guessInput');
const guessBtn = document.getElementById('guessBtn');
const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById('restartBtn');
const errorText = document.getElementById('errorText');
const resultText = document.getElementById('resultText');
const hintText = document.getElementById('hintText');
const counterText = document.getElementById('counter');

let minValue;
let maxValue;
let secretNumber;
let counter = 0;
let isEven;

// загадываем число
function makeNumber() {
  minValue = parseInt(document.getElementById("minValue").value);
  maxValue = parseInt(document.getElementById("maxValue").value);

  if ((maxValue <= minValue) || (minValue < 1) || (maxValue > 1000)) {
    errorText.textContent = "Введите правильный диапазон от 1 до 1000";
    return;
  }

  secretNumber = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
  isEven = (secretNumber % 2 === 0);

  errorText.textContent = "";
  showGuessContainer()
}

// угадываем число
function guessNumber() {
  hintText.textContent = "";
  const inputNumber = parseInt(document.getElementById('inputNumber').value);

  if (inputNumber < minValue || inputNumber > maxValue || !(Number.isInteger(inputNumber))) {
    resultText.textContent = `Введите число внутри указанного диапазона: ${minValue}-${maxValue}`;
    return;
  }

  counter++;
  counterText.textContent = `Попытка № ${counter}`;

  if (inputNumber === secretNumber) {
    showSuccessResult();
    return;
  }

  if (counter % 3 === 0) {
    hintText.textContent = `Загаданное число ${isEven ? 'четное' : 'нечетное'}`;
  }

  resultText.textContent = inputNumber < secretNumber
    ? `Число должно быть больше`
    : `Число должно быть меньше`;
}

function restartGame() {
  hideGuessContainer();
  resetResultStyles();

  document.getElementById('inputNumber').value = '';
  counterText.textContent = '';
  counter = 0;
}

startBtn.addEventListener('click', makeNumber);
guessBtn.addEventListener('click', guessNumber);
restartBtn.addEventListener('click', restartGame);

//вспомогательные функции
function showGuessContainer() {
  guessContainer.style.opacity = "1";
  initialContainer.style.pointerEvents = "none";
  initialContainer.style.opacity = "0.6";
}

function hideGuessContainer() {
  guessContainer.style.opacity = "0";
  initialContainer.style.opacity = "1";
  initialContainer.style.pointerEvents = "auto";
}

function showSuccessResult() {
  resultText.style.color = '#529d46';
  resultText.style.fontSize = '21px';
  guessInputZone.style.pointerEvents = 'none';
  guessInputZone.style.opacity = '0.6';
  resultText.textContent = `Вы угадали!`;
}

function resetResultStyles() {
  resultText.style.color = '#cb3d3d';
  resultText.style.fontSize = '12px';
  guessInputZone.style.pointerEvents = 'auto';
  guessInputZone.style.opacity = '1';
  resultText.textContent = '';
}