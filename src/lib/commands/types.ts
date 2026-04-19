export interface Command {
	id: string;
	label: string;
	description: string;
	category: string;
	keywords?: string[];
	action: () => void;
}

export interface Theme {
	id: string;
	name: string;
	accent: string;
	accentHex: string;
	glowColor: string;
}
