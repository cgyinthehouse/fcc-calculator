export default function useCalculator(
  display: string,
  setDisplay: React.Dispatch<React.SetStateAction<string>>,
  formula: string,
  setFormula: React.Dispatch<React.SetStateAction<string>>,
  isDecimal: React.MutableRefObject<boolean>,
) {
  const operators = "+-*/";

  function appendNum(i: string): void {
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

  function appendOperator(i: string): void {
    isDecimal.current = false;

    if (!formula) {
      // add a 0 before the formula if the formula is empty
      setFormula("0" + i);
    } else if (formula.includes("=")) {
      // replace the formula with the last computed result if there is a = in it
      setFormula(display + i);
    } else if (i == "-" && /[.\d][*/]$/.test(formula)) {
      setFormula(formula + i);
    } else if (/[*/+]/.test(i) && /[*/]-$/.test(formula)) {
      setFormula(formula.slice(0, -2) + i);
    } else {
      setFormula(
        (formula) =>
          (operators.includes(formula.slice(-1))
            ? formula.slice(0, -1)
            : formula) + i,
      );
    }
  }

  function appendDot(): void {
    if (isDecimal.current) return;

    if (formula.includes("=")) {
      setDisplay("0.");
      setFormula("0.");
    } else if (operators.includes(formula.slice(-1))) {
      setDisplay("0.");
      setFormula(formula + "0.");
    } else {
      setDisplay(display + ".");
      setFormula(formula + ".");
    }

    isDecimal.current = true;
  }

  function appendEqual(): void {
    const fm = operators.includes(formula.slice(-1))
      ? formula.slice(0, -1)
      : formula;
    const res = eval(fm) as string;
    setDisplay(res);
    setFormula(fm + "=" + res);
  }

  function appendPercent(): void {
    isDecimal.current = true;
    if (operators.includes(formula.slice(-1))) return;
    else {
      const res = (Number(display) * 0.01).toString();
      setDisplay(res);
      // const regex = /(?<=[-+*/])\d+(\.\d+)?$/;
      const regex = /(?<=[-+*/]|^)\d+(\.\d+)?$/g;
      setFormula(formula.replace(regex, res));
    }
  }

  // TODO: switch the AC button to C(clear current input) when entering
  function allclear(): void {
    setDisplay("0");
    setFormula("");
    isDecimal.current = false;
  }

  return {
    appendNum,
    appendOperator,
    appendDot,
    appendEqual,
    appendPercent,
    allclear,
  };
}
