import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggle } = useContext(ThemeContext);

  return (
    <button
      onClick={toggle}
      title="Toggle theme"
      className="btn"
      style={{
        padding: "8px 12px",
        fontSize: 14,
        fontWeight: 700,
      }}
    >
      {theme === "light" ? "🌞 Light" : "🌙 Dark"}
    </button>
  );
}
