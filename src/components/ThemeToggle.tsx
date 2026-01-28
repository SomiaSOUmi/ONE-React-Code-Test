import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
      title={`Current: ${theme} theme`}
    >
      {theme === "light" ? (
        <span className="theme-toggle__icon">🌙</span>
      ) : (
        <span className="theme-toggle__icon">☀️</span>
      )}
    </button>
  );
}
