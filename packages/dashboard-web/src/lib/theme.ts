const THEME_VALUES = [
	"system",
	"light",
	"dark",
	"catppuccin-latte",
	"catppuccin-frappe",
	"catppuccin-macchiato",
	"catppuccin-mocha",
] as const;

export type Theme = (typeof THEME_VALUES)[number];

/**
 * Every theme class this app may write on <html>; used for clean removal.
 * "system" is excluded because it is never applied as a CSS class — it is
 * resolved to "light" or "dark" at runtime based on OS preference.
 */
export const ALL_THEME_CLASSES = [
	"light",
	"dark",
	"catppuccin-latte",
	"catppuccin-frappe",
	"catppuccin-macchiato",
	"catppuccin-mocha",
] as const;

const VALID_THEMES = new Set<Theme>(THEME_VALUES);

/** Read a stored/unknown value into a valid Theme, defaulting to "system". */
export function normalizeTheme(value: string | null): Theme {
	return value && VALID_THEMES.has(value as Theme) ? (value as Theme) : "system";
}

/**
 * Resolve a theme to the list of classes to apply on <html>.
 * Dark Catppuccin flavors include "dark" so Tailwind `dark:` utilities stay active.
 */
export function resolveThemeClasses(theme: Theme, prefersDark: boolean): string[] {
	switch (theme) {
		case "system":
			return [prefersDark ? "dark" : "light"];
		case "light":
			return ["light"];
		case "dark":
			return ["dark"];
		case "catppuccin-latte":
			return ["catppuccin-latte"];
		case "catppuccin-frappe":
			return ["dark", "catppuccin-frappe"];
		case "catppuccin-macchiato":
			return ["dark", "catppuccin-macchiato"];
		case "catppuccin-mocha":
			return ["dark", "catppuccin-mocha"];
		default: {
			const _exhaustive: never = theme;
			return _exhaustive;
		}
	}
}

/** Flavor metadata for the picker UI. Swatch = each flavor's Peach accent. */
export const CATPPUCCIN_FLAVORS: readonly {
	theme: Theme;
	label: string;
	swatch: string;
}[] = [
	{ theme: "catppuccin-latte", label: "Latte", swatch: "#fe640b" },
	{ theme: "catppuccin-frappe", label: "Frappé", swatch: "#ef9f76" },
	{ theme: "catppuccin-macchiato", label: "Macchiato", swatch: "#f5a97f" },
	{ theme: "catppuccin-mocha", label: "Mocha", swatch: "#fab387" },
];
