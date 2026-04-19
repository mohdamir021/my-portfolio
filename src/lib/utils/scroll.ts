export function scrollToSection(id: string, offset = 0) {
	const el = document.getElementById(id);
	if (!el) return;

	const top = el.getBoundingClientRect().top + window.scrollY - offset;
	window.scrollTo({ top, behavior: 'smooth' });
}

export function observeSection(
	node: HTMLElement,
	callback: (visible: boolean) => void
): { destroy: () => void } {
	const observer = new IntersectionObserver(
		([entry]) => callback(entry.isIntersecting),
		{ threshold: 0.2 }
	);
	observer.observe(node);
	return {
		destroy() {
			observer.disconnect();
		}
	};
}
