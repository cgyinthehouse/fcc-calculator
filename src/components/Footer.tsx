import GHicon from "../assets/GHicon";

export default function Footer() {
  return (
    <footer>
      <p>by</p>
      <p onClick={() => window.open("https://github.com/cgyinthehouse")}>
        Kent Chen
      </p>
      <GHicon
        fill="#737373"
        onClick={() =>
          window.open("https://github.com/cgyinthehouse/fcc-frontend-projects")
        }
      />
    </footer>
  );
}
