let display = document.getElementById("display");

function appendToDisplay(value) {
  if (display.innerText === "0" && value !== ".") {
    display.innerText = value;

  } else if (display.innerText === "0" && value === ".") {
      display.innerText = "0."

  } else {
    display.innerText += value;
  }
}

function clearDisplay() {
  display.innerText = "0";
}

function backspace() {
  display.innerText = display.innerText.slice(0, -1) || "0";
}

function factorial(numb) {
  if (isNaN(numb)) throw new Error("Invalid factorial");
  let result = 1;
  for (let i=2; i <= numb; i++) 
    result *= i;

  return result;
}

function handleParentheses(eval_str) {
  let openCount = 0;
  let closeCount = 0;
  // Count open and close parentheses
  for (let char of eval_str) {
    if (char === "(") openCount++;
    if (char === ")") closeCount++;
  }
  // If opens was more than closes, appends closing parentheses
  while (openCount > closeCount) {
    eval_str += ")";
    closeCount++;
  }
  return eval_str;
}

function inputValidation(eval_str) {
    // Replace "π" with "(3.142)"
    eval_str = eval_str.replace(/π/g, "(3.142)");
    // Replace "÷" with "/"
    eval_str = eval_str.replace(/÷/g, "/");
    // Add "*" before or after prantheses that haven't any operators
    eval_str = eval_str.replace(/([\d.]+)\(/g, '$1*(');
    eval_str = eval_str.replace(/\)(?=[\d.])/g, ')*');
    // Replace "√" with "Math.sqrt(" in "eval_str"
    eval_str = eval_str.replace(/√/g, "Math.sqrt");
    // Replace "log" and with "Math.log10("
    eval_str = eval_str.replace(/log/g, "Math.log10(");
    // Replace "mod" and with "%"
    eval_str = eval_str.replace(/mod/g, "%");
    // Replace factorial (simple integer case)
    eval_str = eval_str.replace(/(\d+)!/g, 'factorial($1)');
    // If there was a number before the operator, add "*" before "Math.", handles cases like 2√(16)
    eval_str = eval_str.replace(/([\d.]+)Math/g, '$1*Math');
    // Auto close prantheses
    eval_str = handleParentheses(eval_str);

  return eval_str
}

function calculate() {
  let eval_str = inputValidation(display.innerText);
  try {
    let result = eval(eval_str);
    // Check for zero-division error and other infinities
    if (!isFinite(result)) {
      throw new Error("Invalid calculation");
    }
    // Round if it was a long float
    result = Number(result.toPrecision(4));
    display.innerText = result;

  } catch (error) {
    display.innerText = "Error";
    setTimeout(clearDisplay, 1500);
  }
}

// Connect specific keyboard buttons to the app
document.addEventListener("keydown", (event) => {
const key = event.key;

if (/[0-9.+\-*()]/.test(key)) {
appendToDisplay(key);
return; 
}
switch (key) {
  case "/":
    appendToDisplay("÷");
    break;
    
  case "Enter":
    event.preventDefault();
    calculate();
    break;

  case "Escape":
  case "Delete":
  case "c":
    clearDisplay();
    break;

  case "Backspace":
    event.preventDefault();
    backspace();
    break;
}
})
