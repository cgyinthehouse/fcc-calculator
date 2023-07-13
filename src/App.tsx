import "./App.css";
import { useState, useRef, useEffect } from "react";
import GHicon from "./assets/GHicon";

function App() {
  const [formula, setFormula] = useState<string>("");
  const [display, setDisplay] = useState<string>("0");
  const isDecimal = useRef<boolean>(false);

  // TODO: figure out if there has a way to change the css
  // that similar to the mechanism of toggling Tailwind classes depending on React state
  useEffect(() => {
    let element: HTMLElement | null = null;
    switch (formula.slice(-1)) {
      case "+":
        element = document.getElementById("add");
        break;
      case "-":
        element = document.getElementById("subtract");
        break;
      case "*":
        element = document.getElementById("multiply");
        break;
      case "/":
        element = document.getElementById("divide");
        break;
    }
    element?.style.setProperty("background-color", "#f5f5f5");
    element?.style.setProperty("color", "#f79905");

    return () => {
      element?.style.removeProperty("background-color");
      element?.style.removeProperty("color");
    };
  }, [formula]);

  // TODO: 1. max digit limit 2. thousand seperator
  useEffect(() => {
    if (display.length >= 9) {
      document.querySelector("input")?.style.setProperty("font-size", "2.6em");
    } else if (display.length >= 8) {
      document.querySelector("input")?.style.setProperty("font-size", "3em");
    } else {
      document.querySelector("input")?.style.removeProperty("font-size");
    }
  }, [display]);

  const append = (i: string): void => {
    const numbers = "0123456789";
    const operators = "+-*/";

    // NUMBER
    if (numbers.includes(i)) {
      // clear the formula if there is a = in formula
      if (formula.includes("=")) {
        setDisplay(i);
        setFormula(i);
      }

      // if the end of formula is an operator, override current display
      else if (operators.includes(formula.slice(-1))) {
        setDisplay(i);
        setFormula(formula + i);
      }
      // if the end of formula is an operator followed by a 0, disable entering a 0
      else if (
        operators.includes(formula.slice(-2, -1)) &&
        formula.slice(-1) == "0"
      ) {
        if (i == "0") return;
        else {
          setDisplay(i);
          setFormula(formula.slice(0, -2) + i);
        }
      }
      // else append the number
      else {
        setDisplay(display + i);
        setFormula(formula + i);
      }
    }
    // OPERATORS
    else if (operators.includes(i)) {
      isDecimal.current = false;

      // add a 0 before the formula if the formula is empty
      if (!formula) setFormula("0");

      // replace the formula with the last computed result if there is a = in it
      if (formula.includes("=")) {
        setFormula(display + i);
      }
      // only use tha last input operator
      // FIXME: after entering a -, check if the end of formula is * or /
      else {
        setFormula(
          (formula) =>
            (operators.includes(formula.slice(-1))
              ? formula.slice(0, -1)
              : formula) + i
        );
      }
    }
    // DOT
    else if (i == ".") {
      if (isDecimal.current) return;

      if (formula.includes("=")) {
        setDisplay("0.");
        setFormula("0.");
      } else if (operators.includes(formula.slice(-1))) {
        setDisplay("0.");
        setFormula(formula + "0.");
      } else {
        setDisplay(display + i);
        setFormula(formula + i);
      }

      isDecimal.current = true;
    }
    // EQUAL
    else if (i == "=") {
      const fm = operators.includes(formula.slice(-1))
        ? formula.slice(0, -1)
        : formula;
      const res = eval(fm) as string;
      setDisplay(res);
      setFormula(fm + "=" + res);
    } else if (i == "%") {
      isDecimal.current = true;

      if (operators.includes(formula.slice(-1))) {
        return;
      } else {
        const res = (Number(display) * 0.01).toString();
        setDisplay(res);
        // const regex = /(?<=[-+*/])\d+(\.\d+)?$/;
        const regex = /(?<=[-+*/]|^)\d+(\.\d+)?$/g;
        setFormula(formula.replace(regex, res));
      }
    }
  };

  // TODO: switch the AC button to C(clear current input) when entering
  const allclear = () => {
    setDisplay("0");
    setFormula("");
    isDecimal.current = false;
  };

  return (
    <div id="calculator">
      <div>
        <p id="formula">{formula}</p>
        <input
          id="display"
          type="text"
          value={display}
          onChange={(e) => {
            // TODO: write a keybroad input version
            // - disable 0s after 'operator + 0'
            // - no consecutive operators
            // - can only contain one dot at most between operators
            // - single dot between operators are not allowd

            // this code here is just a temporary test
            const regex = /^[0-9+\-*/.()=]+$/;
            const v = e.target.value;
            regex.test(v) && setDisplay(v);
          }}
        />
      </div>

      <div id="buttons">
        <button id="clear" onClick={allclear}>
          AC
        </button>
        {/* TODO: figure out wtf is this */}
        <button id="plus_or_minus">+/-</button>
        <button id="percent" onClick={() => append("%")}>
          %
        </button>
        <button id="divide" onClick={() => append("/")}>
          ÷
        </button>
        <button id="seven" onClick={() => append("7")}>
          7
        </button>
        <button id="eight" onClick={() => append("8")}>
          8
        </button>
        <button id="nine" onClick={() => append("9")}>
          9
        </button>
        <button id="multiply" onClick={() => append("*")}>
          ×
        </button>
        <button id="four" onClick={() => append("4")}>
          4
        </button>
        <button id="five" onClick={() => append("5")}>
          5
        </button>
        <button id="six" onClick={() => append("6")}>
          6
        </button>
        <button id="subtract" onClick={() => append("-")}>
          −
        </button>
        <button id="one" onClick={() => append("1")}>
          1
        </button>
        <button id="two" onClick={() => append("2")}>
          2
        </button>
        <button id="three" onClick={() => append("3")}>
          3
        </button>
        <button id="add" onClick={() => append("+")}>
          +
        </button>
        <button id="zero" onClick={() => append("0")}>
          0
        </button>
        <button id="decimal" onClick={() => append(".")}>
          .
        </button>
        <button id="equals" onClick={() => append("=")}>
          =
        </button>
      </div>
      <div id="footer">
        <p>by</p>
        <p onClick={() => window.open("https://github.com/cgyinthehouse")}>
          Kent Chen
        </p>
        <GHicon
          fill="#737373"
          onClick={() =>
            window.open(
              "https://github.com/cgyinthehouse/fcc-frontend-projects"
            )
          }
        />
      </div>
    </div>
  );
}

export default App;
