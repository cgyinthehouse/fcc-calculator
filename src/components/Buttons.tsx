import useCalculator from "../hooks/useCalculator";

interface Props {
  display: string;
  setDisplay: React.Dispatch<React.SetStateAction<string>>;
  formula: string;
  setFormula: React.Dispatch<React.SetStateAction<string>>;
  isDecimal: React.MutableRefObject<boolean>;
}

export default function Buttons({
  display,
  setDisplay,
  formula,
  setFormula,
  isDecimal,
}: Props) {
  const {
    appendNum,
    appendDot,
    appendEqual,
    appendOperator,
    appendPercent,
    allclear,
  } = useCalculator(display, setDisplay, formula, setFormula, isDecimal);

  return (
    <div id="buttons">
      <button id="clear" onClick={allclear}>
        AC
      </button>
      {/* TODO: find out wtf is this */}
      <button id="plus_or_minus">+/-</button>
      <button id="percent" onClick={appendPercent}>
        %
      </button>
      <button id="divide" onClick={() => appendOperator("/")}>
        ÷
      </button>
      <button id="seven" onClick={() => appendNum("7")}>
        7
      </button>
      <button id="eight" onClick={() => appendNum("8")}>
        8
      </button>
      <button id="nine" onClick={() => appendNum("9")}>
        9
      </button>
      <button id="multiply" onClick={() => appendOperator("*")}>
        ×
      </button>
      <button id="four" onClick={() => appendNum("4")}>
        4
      </button>
      <button id="five" onClick={() => appendNum("5")}>
        5
      </button>
      <button id="six" onClick={() => appendNum("6")}>
        6
      </button>
      <button id="subtract" onClick={() => appendOperator("-")}>
        −
      </button>
      <button id="one" onClick={() => appendNum("1")}>
        1
      </button>
      <button id="two" onClick={() => appendNum("2")}>
        2
      </button>
      <button id="three" onClick={() => appendNum("3")}>
        3
      </button>
      <button id="add" onClick={() => appendOperator("+")}>
        +
      </button>
      <button id="zero" onClick={() => appendNum("0")}>
        0
      </button>
      <button id="decimal" onClick={appendDot}>
        .
      </button>
      <button id="equals" onClick={appendEqual}>
        =
      </button>
    </div>
  );
}
