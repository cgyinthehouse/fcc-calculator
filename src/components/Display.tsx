interface Props {
  formula: string;
  display: string;
  setDisplay: (display: string) => void;
}

export default function Display({ formula, display, setDisplay }: Props) {
  return (
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
  );
}
