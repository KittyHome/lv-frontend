import { useState } from "react";

const ThemeToggle = () => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 bg-primary-200 text-background-100 rounded"
    >
      Toggle Theme
    </button>
  );
};

export default ThemeToggle;
