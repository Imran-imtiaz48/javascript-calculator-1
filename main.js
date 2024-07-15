"use strict";

const input = document.querySelector(".input");
const result = document.querySelector(".result");
const deleteBtn = document.querySelector(".delete");
const keys = document.querySelectorAll(".bottom span");

let operation = "";
let answer = "";
let decimalAdded = false;

const operators = ["+", "-", "x", "÷"];

function handleKeyPress(e) {
  const key = e.target.dataset.key;
  const lastChar = operation.slice(-1);

  if (key === "=" || (key === "." && decimalAdded)) return;

  if (operators.includes(key)) decimalAdded = false;

  if (!operation.length && key === "-") {
    operation += key;
    input.innerHTML = operation;
    return;
  }

  if (!operation.length && operators.includes(key)) {
    input.innerHTML = operation;
    return;
  }

  if (operators.includes(lastChar) && operators.includes(key)) {
    operation = operation.slice(0, -1) + key;
    input.innerHTML = operation;
    return;
  }

  if (key === ".") decimalAdded = true;
  operation += key;
  input.innerHTML = operation;
}

function evaluate(e) {
  const key = e.target.dataset.key;
  const lastChar = operation.slice(-1);

  if (key === "=" && operators.includes(lastChar)) {
    operation = operation.slice(0, -1);
  }

  if (!operation.length) {
    result.innerHTML = "";
    return;
  }

  try {
    if (operation.startsWith("0") && operation[1] !== "." && operation.length > 1) {
      operation = operation.slice(1);
    }

    const finalOperation = operation.replace(/x/g, "*").replace(/÷/g, "/");
    answer = +(eval(finalOperation)).toFixed(5);

    if (key === "=") {
      decimalAdded = false;
      operation = `${answer}`;
      input.innerHTML = operation;
      result.innerHTML = "";
      return;
    }

    result.innerHTML = answer;

  } catch (error) {
    if (key === "=") {
      decimalAdded = false;
      input.innerHTML = `<span class="error">${operation}</span>`;
      result.innerHTML = `<span class="error">Bad Expression</span>`;
    }
    console.error(error);
  }
}

function clearInput(e) {
  if (e.ctrlKey) {
    operation = "";
    answer = "";
    input.innerHTML = operation;
    result.innerHTML = answer;
    return;
  }

  operation = operation.slice(0, -1);
  input.innerHTML = operation;
}

deleteBtn.addEventListener("click", clearInput);
keys.forEach(key => {
  key.addEventListener("click", handleKeyPress);
  key.addEventListener("click", evaluate);
});
