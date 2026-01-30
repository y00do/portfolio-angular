export const NAVIGATION_ITEMS = [
	{ label: 'ABOUT', href: '#about', id: 'about' },
	{ label: 'EXPERIENCE', href: '#experience', id: 'experience' },
	{ label: 'PROJECTS', href: '#projects', id: 'projects' },
] as const;

export const SECTION_IDS = {
	HOME: 'home',
	ABOUT: 'about',
	EXPERIENCE: 'experience',
	PROJECTS: 'projects',
} as const;
