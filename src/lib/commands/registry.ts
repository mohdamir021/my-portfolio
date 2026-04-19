import type { Command } from './types.js';
import { themes, setTheme } from './themes.js';

export function getCommands(): Command[] {
	const commands: Command[] = [];

	// Theme commands
	for (const theme of themes) {
		commands.push({
			id: `theme-${theme.id}`,
			label: `Set theme: ${theme.name}`,
			description: `Switch accent color to ${theme.accent} (${theme.accentHex})`,
			category: 'Theme',
			keywords: ['theme', 'color', 'accent', theme.accent, theme.name.toLowerCase()],
			action: () => setTheme(theme.id)
		});
	}

	return commands;
}
