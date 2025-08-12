// Seletores DOM
const form = document.getElementById("form-numbers");
const numberQuantity = document.querySelector(".number-quantity");
const minNumber = document.querySelector(".min-number");
const maxNumber = document.querySelector(".max-number");
const errorMessage = document.querySelector(".error-message");
const repeatCheckbox = document.getElementById("repeat");
const classifier = document.querySelector(".classifier");
const resultSection = document.querySelector(".results-section");
const resultHeader = resultSection.querySelector("header");
const numbersContainer = document.querySelector(".numbers-container");
const retryButton = document.getElementById("retry-button");
const arrowButton = document.querySelector('button[form="form-numbers"]');

form.addEventListener("submit", handleDraw);

function handleDraw(event) {
  event.preventDefault();

  const minValue = Math.min(
    parseInt(minNumber.value),
    parseInt(maxNumber.value)
  );
  const maxValue = Math.max(
    parseInt(minNumber.value),
    parseInt(maxNumber.value)
  );
  const quantity = parseInt(numberQuantity.value);

  // Call Validation
  if (!inputValidation(minValue, maxValue, quantity)) {
    return;
  }

  /* Sortear */
  const drawnNumbers = performDraw(minValue, maxValue, quantity);

  let formattedNumbers = drawnNumbers.map((number) => {
    return number < 10 ? String(number).padStart(2, "0") : String(number);
  });

  displayDrawnNumbers(formattedNumbers);
}

function inputValidation(minValue, maxValue, quantity) {
  const range = maxValue - minValue + 1;

  if (range < quantity && repeatCheckbox.checked) {
    errorMessage.classList.remove("hidden");
    return false;
  }
  return true;
}

function performDraw(minValue, maxValue, quantity) {
  if (!repeatCheckbox.checked) {
    // Sorteio COM repetição
    return drawWithRepetition(minValue, maxValue, quantity);
  } else {
    // Sorteio SEM repetição
    return drawWithoutRepetition(minValue, maxValue, quantity);
  }
}

function drawWithRepetition(minValue, maxValue, quantity) {
  const range = maxValue - minValue + 1;
  let drawArray = new Array(quantity);

  for (let i = 0; i < quantity; i++) {
    drawArray[i] = Math.floor(Math.random() * range) + minValue;
  }

  return drawArray;
}

function drawWithoutRepetition(minValue, maxValue, quantity) {
  let availableNumbers = [];
  // Criar array com todos os números disponíveis
  for (let i = minValue; i <= maxValue; i++) {
    availableNumbers.push(i);
  }

  let drawArray = [];

  for (let i = 0; i < quantity; i++) {
    const randomIndex = Math.floor(Math.random() * availableNumbers.length);
    drawArray.push(availableNumbers[randomIndex]);
    availableNumbers.splice(randomIndex, 1);
  }

  return drawArray;
}

function displayDrawnNumbers(formattedNumbers) {
  classifier.classList.add("hidden");
  resultSection.classList.remove("hidden");

  numbersContainer.innerHTML = ""; // limpa antes

  // Criação do elemento (número)
  setTimeout(() => {
    createCard(formattedNumbers);
  }, 500);
}

function createCard(formattedNumbers) {
  formattedNumbers.forEach((number, index) => {
    setTimeout(() => {
      const div = document.createElement("div");
      div.classList.add("number-card");
      numbersContainer.appendChild(div);

      const span = document.createElement("span");
      span.classList.add("number-display");
      span.textContent = number;
      div.appendChild(span);
    }, 500 * index);
  });
}

// === Validate numeric input ===
[maxNumber, minNumber, numberQuantity].forEach((input) => {
  input.addEventListener("input", (event) => {
    event.target.value = event.target.value.replace(/[^0-9]/g, "");

    // === Remove error message ===
    if (!errorMessage.classList.contains("hidden")) {
      errorMessage.classList.add("hidden");
    }
  });
});

// === Input character limited ===
numberQuantity.addEventListener("input", (event) => {
  numberQuantity.value = event.target.value.slice(0, 1);
});

[maxNumber, minNumber].forEach((input) => {
  input.addEventListener("input", (event) => {
    event.target.value = event.target.value.slice(0, 2);
  });
});

// === Animation functions ===
arrowButton.addEventListener("click", () => {
  const arrowIcon = arrowButton.querySelector("img");
  arrowIcon.classList.add("move-x");
  setTimeout(() => {
    arrowIcon.classList.remove("move-x");
  }, 500);
});

retryButton.addEventListener("click", (event) => {
  const retryIcon = retryButton.querySelector("img");
  retryIcon.classList.add("icon-spin");
  setTimeout(() => {
    retryIcon.classList.remove("icon-spin");
  }, 500);

  handleDraw(event);
});
