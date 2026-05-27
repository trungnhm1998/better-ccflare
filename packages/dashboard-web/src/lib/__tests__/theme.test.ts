import { describe, expect, it } from "bun:test";
import {
	ALL_THEME_CLASSES,
	CATPPUCCIN_FLAVORS,
	normalizeTheme,
	resolveThemeClasses,
} from "../theme";

describe("resolveThemeClasses", () => {
	it("maps system to dark when OS prefers dark", () => {
		expect(resolveThemeClasses("system", true)).toEqual(["dark"]);
	});

	it("maps system to light when OS prefers light", () => {
		expect(resolveThemeClasses("system", false)).toEqual(["light"]);
	});

	it("maps explicit light/dark directly", () => {
		expect(resolveThemeClasses("light", true)).toEqual(["light"]);
		expect(resolveThemeClasses("dark", false)).toEqual(["dark"]);
	});

	it("gives dark flavors a companion .dark class", () => {
		expect(resolveThemeClasses("catppuccin-frappe", false)).toEqual([
			"dark",
			"catppuccin-frappe",
		]);
		expect(resolveThemeClasses("catppuccin-macchiato", false)).toEqual([
			"dark",
			"catppuccin-macchiato",
		]);
		expect(resolveThemeClasses("catppuccin-mocha", false)).toEqual([
			"dark",
			"catppuccin-mocha",
		]);
	});

	it("keeps Latte light with no .dark class even if OS prefers dark", () => {
		expect(resolveThemeClasses("catppuccin-latte", true)).toEqual([
			"catppuccin-latte",
		]);
	});
});

describe("normalizeTheme", () => {
	it("passes through known themes", () => {
		expect(normalizeTheme("catppuccin-mocha")).toBe("catppuccin-mocha");
		expect(normalizeTheme("system")).toBe("system");
	});

	it("falls back to system for unknown or null", () => {
		expect(normalizeTheme("bogus")).toBe("system");
		expect(normalizeTheme(null)).toBe("system");
	});
});

describe("metadata", () => {
	it("lists all four flavors with a swatch color", () => {
		expect(CATPPUCCIN_FLAVORS.map((f) => f.theme)).toEqual([
			"catppuccin-latte",
			"catppuccin-frappe",
			"catppuccin-macchiato",
			"catppuccin-mocha",
		]);
		for (const f of CATPPUCCIN_FLAVORS) {
			expect(f.swatch).toMatch(/^#[0-9a-f]{6}$/i);
		}
	});

	it("includes every managed class for cleanup", () => {
		expect(ALL_THEME_CLASSES).toEqual([
			"light",
			"dark",
			"catppuccin-latte",
			"catppuccin-frappe",
			"catppuccin-macchiato",
			"catppuccin-mocha",
		]);
	});
});
