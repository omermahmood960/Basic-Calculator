const previousDisplay = document.querySelector('.previous-display');
const currentDisplay = document.querySelector('.current-display');

const operatorButtons = document.querySelectorAll("[data-operation]");
const numberButtons = document.querySelectorAll("[data-number]");

const clearButton = document.querySelector("[data-action='clear']");
const deleteButton = document.querySelector("[data-action='delete']");
let calculateResult = document.querySelector("[data-action='calculate']");

let currentNumber = "0";
let previousNumber = "";
let operation = undefined;
let justCalculated = true;
document.addEventListener("DOMContentLoaded", () => {
    numberButtons.forEach(numberButton => {
        numberButton.addEventListener("click", () => {
            appendNumber(numberButton.dataset.number);
        })
    })
    clearButton.addEventListener("click", () => clearCalculator())
    calculateResult.addEventListener("click", () => calculate());
    deleteButton.addEventListener("click", () => deleteNumber());
    operatorButtons.forEach(operatorButton => operatorButton.addEventListener("click", () => chooseOperation(operatorButton.dataset.operation)));
})
function clearCalculator() {
    currentNumber = "0";
    previousNumber = "";
    operation = undefined;
    updateDisplay();
}
function deleteNumber() {
    if (currentNumber.length === 1) {
        currentNumber = "0";
    } else {
        currentNumber = currentNumber.slice(0, -1);
    }
    updateDisplay();
    
}
function updateDisplay() {
    currentDisplay.textContent = currentNumber;
    if (operation != null) {
        previousDisplay.textContent = `${previousNumber} ${operation}`;
    } else {
        previousDisplay.textContent = "";
    }
}
function chooseOperation(selectedOperation) {
    if (currentNumber === "") {
        return;
    } 
    if (previousNumber !== "") {
        return;
    } 
    operation = selectedOperation;
    previousNumber = currentNumber;
    currentNumber = "0";
    updateDisplay();
}
function appendNumber(num) {
    if (num === "." && currentNumber.includes(".")) {
    return;
    }
    if (currentNumber === "0" && num != ".") {
        currentNumber = num;
    } else {
        currentNumber += num;
    }
    updateDisplay();
}
function calculate() {
    let current = parseFloat(currentNumber);
    let previous = parseFloat(previousNumber);
    let result;
    switch(operation) {
        case "+":
            result = previous + current;
            break;
        case "-":
            result = previous - current;
            break;
        case "*":
            result = previous * current;
            break;
        case "/":
            if (current === 0) {
                currentNumber = "Error";
                operation = undefined;
                previousNumber = "";
                updateDisplay();
                return;
            }
            result = previous/current;
            break;
        case "%":
            result = previous % current;
            break;
        default:
            return;
    }
    currentNumber = result.toString();
    previousNumber = "";
    operation = undefined;
    updateDisplay();
}

