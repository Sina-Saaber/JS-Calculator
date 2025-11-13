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

function handleParentheses(eval) {
  let openCount = 0;
  let closeCount = 0;

  // Count open and close parentheses
  for (let char of eval) {
    if (char === "(") openCount++;
    if (char === ")") closeCount++;
  }
  // If opens was more than closes, appends closing parentheses
  while (openCount > closeCount) {
    eval += ")";
    closeCount++;
  }
  return eval;
}

// function inputValidation() {
//   try {
//     let eval = display.innerText;
//     // Replace sqrt() with Math.sqrt()
//     eval = eval.replace(/√\(/g, "Math.sqrt(");
//   } catch {
//     alert("fart hard")
//   }
// }

function clearDisplay() {
  display.innerText = "0";
}

function backspace() {
  display.innerText = display.innerText.slice(0, -1) || "0";
}

function calculate() {
  let expression = display.innerText;
  expression = handleParentheses(expression)
  try {
    // Replace sqrt() with Math.sqrt()
    expression = expression.replace(/√/g, "Math.sqrt(");

    let result = eval(expression);
    if (isNaN(result) || !isFinite(result)) {
      throw new Error("Invalid calculation");
    }
    display.innerText = result;
  } catch (error) {
    display.innerText = "Error";
    setTimeout(clearDisplay, 1500);
  }
}

document.addEventListener("keydown", (event) => {
  const key = event.key;
  if (
    (key >= "0" && key <= "9") ||
    key === "." ||
    key === "+" ||
    key === "-" ||
    key === "*" ||
    key === "/"
  ) {
    appendToDisplay(key);
  } else if (key === "Enter") {
    event.preventDefault();
    calculate();

  } else if (key === "Escape" || key === "c") {
    clearDisplay();

  } else if (key === "(" || key === ")") {
    appendToDisplay(key);

  } else if (key === "Backspace") {
    event.preventDefault();
    backspace();
  }
});
