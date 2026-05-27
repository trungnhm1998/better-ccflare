import type React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import {
	ALL_THEME_CLASSES,
	normalizeTheme,
	resolveThemeClasses,
	type Theme,
} from "../lib/theme";

type ThemeContextType = {
	theme: Theme;
	setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function applyTheme(theme: Theme) {
	const root = window.document.documentElement;
	const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
	root.classList.remove(...ALL_THEME_CLASSES);
	root.classList.add(...resolveThemeClasses(theme, prefersDark));
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
	const [theme, setTheme] = useState<Theme>(() =>
		normalizeTheme(localStorage.getItem("theme")),
	);

	useEffect(() => {
		applyTheme(theme);
		localStorage.setItem("theme", theme);
	}, [theme]);

	useEffect(() => {
		if (theme !== "system") return;
		const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
		const handleChange = () => applyTheme("system");
		mediaQuery.addEventListener("change", handleChange);
		return () => mediaQuery.removeEventListener("change", handleChange);
	}, [theme]);

	return (
		<ThemeContext.Provider value={{ theme, setTheme }}>
			{children}
		</ThemeContext.Provider>
	);
}

export function useTheme() {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error("useTheme must be used within a ThemeProvider");
	}
	return context;
}
