const form = document.getElementById("form-numbers");
const numberQuantity = document.querySelector(".number-quantity");
const minNumber = document.querySelector(".min-number");
const maxNumber = document.querySelector(".max-number");
const errorMessage = document.querySelector(".error-message");

form.addEventListener("submit", handleDraw);

function handleDraw(event) {
  event.preventDefault();

  const inputsValue = {
    quantity: numberQuantity.value,
    min: minNumber.value,
    max: maxNumber.value,
  };

  // Call Validation
  inputValidation(inputsValue);

  // Call draw function
}

// Evento para validar input
[maxNumber, minNumber, numberQuantity].forEach((input) => {
  input.addEventListener("input", (event) => {
    event.target.value = event.target.value.replace(/[^0-9]/g, "");

    if (!errorMessage.classList.contains("hidden")) {
      errorMessage.classList.add("hidden");
    }
  });
});

// Evento para limitar caracteres.
numberQuantity.addEventListener("input", (event) => {
  numberQuantity.value = event.target.value.charAt(0);
});

[maxNumber, minNumber].forEach((input) => {
  input.addEventListener("input", (event) => {
    event.target.value = event.target.value.slice(0, 2);
  });
});

function inputValidation(value) {
  let difference = Math.abs(value.min - value.max);

  if (difference < value.quantity) {
    errorMessage.classList.remove("hidden");
  }
}
