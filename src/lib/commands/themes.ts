import type { Theme } from './types.js';

export const themes: Theme[] = [
	{
		id: 'teal',
		name: 'Catppuccin Teal',
		accent: 'teal',
		accentHex: '#94e2d5',
		glowColor: '#94e2d5'
	},
	{
		id: 'blue',
		name: 'Catppuccin Blue',
		accent: 'blue',
		accentHex: '#89b4fa',
		glowColor: '#89b4fa'
	},
	{
		id: 'mauve',
		name: 'Catppuccin Purple',
		accent: 'mauve',
		accentHex: '#cba6f7',
		glowColor: '#cba6f7'
	}
];

let currentThemeId = 'teal';

export function getActiveThemeId(): string {
	return currentThemeId;
}

export function setTheme(themeId: string): void {
	const theme = themes.find((t) => t.id === themeId);
	if (!theme) return;

	currentThemeId = themeId;

	const root = document.documentElement;
	const hex = theme.accentHex;

	root.style.setProperty('--teal', hex);
	root.style.setProperty('--glow-teal', `0 0 8px ${hex}80, 0 0 20px ${hex}30`);
	root.style.setProperty('--border-accent', `1px solid ${hex}`);

	// Update Tailwind theme color
	root.style.setProperty('--color-teal', hex);

	// Update scanline and grid overlays that use hardcoded teal hex
	root.style.setProperty('--accent-scanline', `${hex}06`);
	root.style.setProperty('--accent-grid', `${hex}08`);
	root.style.setProperty('--accent-selection', `${hex}40`);

	// Persist preference
	try {
		localStorage.setItem('portfolio-theme', themeId);
	} catch {
		// Ignore storage errors
	}
}

export function loadSavedTheme(): void {
	try {
		const saved = localStorage.getItem('portfolio-theme');
		if (saved && themes.find((t) => t.id === saved)) {
			setTheme(saved);
		}
	} catch {
		// Ignore storage errors
	}
}
