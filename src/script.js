let display = document.getElementById("display");

function appendToDisplay(value) {
  if (display.innerText === "0" && value !== ".") {
    display.innerText = value;
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

function calculate() {
  try {
    let expression = display.innerText;
    // Replace sqrt() with Math.sqrt()
    expression = expression.replace(/sqrt\(/g, "Math.sqrt(");

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
  } else if (key === "Escape" || key === "c" || key === "C") {
    clearDisplay();
  } else if (key === "(" || key === ")") {
    appendToDisplay(key);
  } else if (key === "Backspace") {
    event.preventDefault();
    backspace();
  }
});
