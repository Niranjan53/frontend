import React, { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

export default function ThemeToggle({ style }) {
  const { theme, toggle } = useContext(ThemeContext);

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      title="Toggle theme"
      style={{
        padding: "8px 10px",
        borderRadius: 8,
        border: "1px solid rgba(255,255,255,0.04)",
        background: "transparent",
        color: "var(--muted)",
        cursor: "pointer",
        fontWeight: 700,
        ...style,
      }}
    >
      {theme === "light" ? "🌤️ Light Mode" : "🌙 Night Mode"}
    </button>
  );
}
