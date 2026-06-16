const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

const historyList = document.getElementById("historyList");

let expression = "";

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.innerText;

    if (value === "=") {
      calculate();
    } else if (value === "C") {
      expression = "";
      display.value = "";
    } else if (value === "⌫") {
      expression = expression.slice(0, -1);

      display.value = expression;
    } else if (value === "%") {
      expression += "/100";

      display.value = expression;
    } else {
      expression += value;
      display.value = expression;
    }
  });
});

function calculate() {
  try {
    const result = eval(expression);

    addHistory(`${expression} = ${result}`);

    display.classList.remove("result-animation");

    void display.offsetWidth;

    display.classList.add("result-animation");

    display.value = result;

    expression = result.toString();
  } catch {
    display.value = "Error";

    expression = "";
  }
}

function addHistory(text) {
  const li = document.createElement("li");

  li.textContent = text;

  historyList.prepend(li);
}

document.getElementById("clearHistory").addEventListener("click", () => {
  historyList.innerHTML = "";
});

document.getElementById("themeToggle").addEventListener("click", () => {
  document.body.classList.toggle("bg-white");

  document.body.classList.toggle("bg-slate-900");
});

document.addEventListener("keydown", (e) => {
  const key = e.key;

  if ("0123456789+-*/.".includes(key)) {
    expression += key;
    display.value = expression;
  }

  if (key === "Enter") {
    calculate();
  }

  if (key === "Backspace") {
    expression = expression.slice(0, -1);

    display.value = expression;
  }

  if (key === "Escape") {
    expression = "";
    display.value = "";
  }
});
