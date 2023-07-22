import { useState, useRef, useEffect } from "react";
import Display from "./Display";
import Buttons from "./Buttons";

export default function Calculator() {
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

  return (
    <div id="calculator">
      <Display formula={formula} display={display} setDisplay={setDisplay} />
      <Buttons
        display={display}
        formula={formula}
        setDisplay={setDisplay}
        setFormula={setFormula}
        isDecimal={isDecimal}
      />
    </div>
  );
}
